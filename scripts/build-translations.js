// const glob = require('glob');
const path = require('path');
// const merge = require('deepmerge');

// const {promisify} = require('util');
const {readFileSync, writeFileSync, mkdirSync, existsSync, readdir, stat} = require('fs');
// const mkdirpAsync = require('mkdirp');
// const mkdirp = promisify(mkdirpAsync);

// The folder where our text modules live.
const textmoduleFolder = path.join("src", "textmodules");

// list of supported languages. Any i18n-json-files must match one of these languages. Otherwise
// the file will not be used. e.g. (.../i18n/de.json)
const supportedLanguages = [
  'de', 'en'
];

// Take the path to a text module and turn it into it's technical key. Technical keys have a 1:1 correlation
// with the path of their text module, e.g. the following path will result in this technical key:
//     src/textmodules/A/B/C.json ==> A.B.C
function getTechnicalKey(textmoduleFilePath) {
  return textmoduleFilePath.split(path.sep).slice(textmoduleFolder.split(path.sep).length).join('.').replace(/.json$/, '');
}

// Load a json translation file and transform its data into a form that is useful for us.
function readTextmodule(textmoduleFilePath, sourceLanguage, collectedTranslations, uniqueTechnicalKeys) {
  // Find the technical key of the text module and remember it for later.
  const technicalKey = getTechnicalKey(textmoduleFilePath);
  uniqueTechnicalKeys.add(technicalKey);
  // Read the textmodule file.
  const file = JSON.parse(readFileSync(textmoduleFilePath).toString());
  // Go over every language and read the json's value
  supportedLanguages.forEach((language) => {
    // We need a fallback translation in case not everything has been translated, yet.
    const fallbackTranslation = "!" + file[sourceLanguage];
    // Make sure an object for this language exists.
    collectedTranslations[language] = collectedTranslations[language] || {};
    // Remember the translation for later, but only use the translation text if the text module is translated.
    collectedTranslations[language][technicalKey] = file[language] ? file[language] : fallbackTranslation;
  })
}


// Write our translations object into a file.
function writeTranslations(targetDir, translations) {
  // Make sure the target directory exists.
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, {recursive: true});
  }

  Object.keys(translations).forEach(function (language) {
    const targetFile = path.join(targetDir, language.toLowerCase() + ".json");
    const fileContents = JSON.stringify(translations[language], null, 4)
    writeFileSync(targetFile, fileContents, "utf8");
    console.log("Wrote " + targetFile);
  });
}

// Write a complete list of our technical keys.
function writeTextmoduleKeys(targetDir, technicalKeySet) {
  const nestedKeyStructure = {};
  technicalKeySet.forEach(technicalKey => insertTechnicalKey(technicalKey, technicalKey, nestedKeyStructure));
  writeTsFile(targetDir, "textmodules", nestedKeyStructure)
}

// We want to write out our technical keys in a nested structure, e.g. keys "A.B.C" and "A.E.F" should fit into the following structure:
// { A: { B: { C: "A.B.C" }, E: { F: "A.E.F" } } }
// This method is for recursively inserting a key into this structure.
function insertTechnicalKey(fullTechnicalKey, subKey, nestedStructure) {
  const technicalKeyComponents = subKey.split('.')
  if(technicalKeyComponents.length === 1) {
    nestedStructure[subKey] = fullTechnicalKey;
  } else {
    nestedStructure[technicalKeyComponents[0]] = nestedStructure[technicalKeyComponents[0]] || {};
    insertTechnicalKey(fullTechnicalKey, technicalKeyComponents.splice(1).join('.'), nestedStructure[technicalKeyComponents[0]]);
  }
}

// Write a simple TypeScript file, which only contains a single variable definition.
function writeTsFile(targetDir, variableName, object) {

  // Make sure the target directory exists.
  if(!existsSync(targetDir)) {
    mkdirSync(targetDir, {recursive: true});
  }
  const targetFile = path.join(targetDir, variableName + ".ts");
  const fileContents = "export const " + variableName + " = " + JSON.stringify(object, null, 2) + ";\n";
  writeFileSync(targetFile, fileContents, "utf8");
  console.log("Wrote " + targetFile);
}

// Recursivley go through a directory and find all text modules. Returns a Promise of an array of all text module paths.
function findAllTextmodules(directory) {
  // We return a promise.
  return new Promise((resolve, reject) => {
    // Asynchronously read the contents of a directory.
    readdir(directory, (error, files) => {
      // Reject the promise if there as an error.
      if (error) reject(new Error("Could not read contents of directory " + directory + ".", error));

      // We asynchronously and recursively go over all content in the directory and join the results together into a single promise.
      Promise.all(files.map((file) => {
        let filePath = path.join(directory, file);
        // Create a promise for reading information about the current file.
        return new Promise((resolve, reject) => {
          // Asynchronously get information about the current file.
          stat(filePath, (error, stat) => {
            // Reject the nested promise if there as an error.
            if (error) reject(new Error("Failed to read stats of " + filePath + ".", error));

            // Recurse for directories.
            if (stat.isDirectory()) {
              findAllTextmodules(filePath).then(resolve);
              // Return the current path for text modules.
            } else if (path.extname(filePath) === ".json") {
              resolve([filePath])
              // Return nothing otherwise.
            } else {
              resolve([])
            }
          });
        });
        // We collected a list of files from our nested promises. Join them.
      })).then((listOfFilePaths) => resolve([].concat(...listOfFilePaths)));
    });
  });
}

// Then, find all text module files.
findAllTextmodules(textmoduleFolder).then((textmoduleFiles) => {
  // Create output objects to store the data we will write out to TypeScript.
  const translations = {};
  const uniqueTechnicalKeys = new Set();
  // Read each text module and add it to the data set.
  textmoduleFiles.forEach((file) => readTextmodule(file, "en", translations, uniqueTechnicalKeys));

  const assetsDir = path.join("src", "assets", "i18n");
  writeTranslations(assetsDir, translations);

  const targetDir = path.join("src", "app", "i18n");
  writeTextmoduleKeys(targetDir, uniqueTechnicalKeys);
});
