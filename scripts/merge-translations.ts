import fs from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

interface TranslationFile {
  [key: string]: any
}

async function findTranslationFiles(): Promise<string[]> {
  return glob('src/**/*.messages.json')
}

async function readJsonFile(filePath: string): Promise<TranslationFile> {
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

async function writeJsonFile(filePath: string, data: TranslationFile): Promise<void> {
  const content = JSON.stringify(data, null, 2)
  await fs.writeFile(filePath, content, 'utf-8')
}

async function mergeTranslations() {
  try {
    // Find all translation files
    const translationFiles = await findTranslationFiles()
    console.log(`Found ${translationFiles.length} translation files`)

    // Create a map to store translations for each language
    const languageTranslations: { [key: string]: TranslationFile } = {}

    // Process each translation file
    for (const file of translationFiles) {
      const translations = await readJsonFile(file)

      // Get all language keys from the file
      const languages = Object.keys(translations)

      // For each language in the file
      for (const lang of languages) {
        if (!languageTranslations[lang]) {
          languageTranslations[lang] = {}
        }

        // Merge the translations
        Object.assign(languageTranslations[lang], translations[lang])
      }
    }

    // Write the merged translations to the main language files
    for (const [lang, translations] of Object.entries(languageTranslations)) {
      const outputPath = path.join('src', 'messages', `${lang}.json`)
      await writeJsonFile(outputPath, translations)
      console.log(`Updated ${outputPath}`)
    }

    console.log('Translation merge completed successfully!')
  } catch (error) {
    console.error('Error merging translations:', error)
    process.exit(1)
  }
}

// Run the merge
mergeTranslations()
