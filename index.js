const defaultActions = [
    {
        type: 'accent',
    }
];

const configs = [
    {
        language: 'ES',
        actions: [
            {
                type: 'propositions',
                value: ["a", "ante", "bajo", "cabe", "con", "contra", "de", "desde", "durante", "dentro", "despues", "en", "entre", "hacia", "hasta", "mediante", "para", "por", "segun", "sin", "so", "sobre", "tras", "versus", "via"]
            },
            {
                type: 'plural',
                value: /es$|s$/
            }
        ]
    },
    {
        language: 'EN',
        actions: [
            {
                type: 'propositions',
                value: [
                    "a",
                    "abaft",
                    "aboard",
                    "about",
                    "above",
                    "absent",
                    "across",
                    "afore",
                    "after",
                    "against",
                    "along",
                    "alongside",
                    "amid",
                    "amidst",
                    "among",
                    "amongst",
                    "an",
                    "anenst",
                    "apropos",
                    "apud",
                    "around",
                    "as",
                    "aside",
                    "astride",
                    "at",
                    "athwart",
                    "atop",
                    "barring",
                    "before",
                    "behind",
                    "below",
                    "beneath",
                    "beside",
                    "besides",
                    "between",
                    "beyond",
                    "but",
                    "by",
                    "circa",
                    "concerning",
                    "despite",
                    "down",
                    "during",
                    "except",
                    "excluding",
                    "failing",
                    "following",
                    "for",
                    "forenenst",
                    "from",
                    "given",
                    "in",
                    "including",
                    "inside",
                    "into",
                    "lest",
                    "like",
                    "mid",
                    "midst",
                    "minus",
                    "modulo",
                    "near",
                    "next",
                    "notwithstanding",
                    "of",
                    "off",
                    "on",
                    "onto",
                    "opposite",
                    "out",
                    "outside",
                    "over",
                    "pace",
                    "past",
                    "per",
                    "plus",
                    "pro",
                    "qua",
                    "regarding",
                    "round",
                    "sans",
                    "save",
                    "since",
                    "than",
                    "through",
                    "throughout",
                    "till",
                    "times",
                    "to",
                    "toward",
                    "towards",
                    "under",
                    "underneath",
                    "unlike",
                    "until",
                    "unto",
                    "up",
                    "upon",
                    "versus",
                    "via",
                    "vice",
                    "with",
                    "within",
                    "without",
                    "worth"
                  ]
            },
            {
                type: 'plural',
                value: /s$/
            }
        ]
    },
    {
        language: 'AR',
        actions: [
            {
                type: 'propositions',
                value: ["a", "etna", "ojab", "ebac", "noc", "artnoc", "ed", "edsed", "etnarud", "ortned", "seupsed", "ne", "ertne", "aicah", "atsah", "etnaidem", "arap", "rop", "nuges", "nis", "os", "erbos", "sart", "susrev", "aiv"]
            },
            {
                type: 'plural',
                value: /^se|^s/
            }
        ]
    },
];

const mechanismForActions = {
    propositions: (word, action) => action.value.some(proposition => proposition === word.toLowerCase()) ? '' : word,
    plural: (word, action) => word.toLowerCase().replace(action.value, ''),
    accent: word => word.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
}

const getActionsToExecuteForLanguage = language => [...defaultActions, ...configs.find(languageConfig => languageConfig.language === language).actions];

const executeAction = (word = '', action) => mechanismForActions[action.type](word, action);

const executeActionsForWord = (word, actions) => actions.reduce((finalWord, currentAction) => executeAction(finalWord, currentAction), word);

const executeActions = (sentence, actions) => sentence.split(' ').map(word => executeActionsForWord(word, actions).toUpperCase()).filter(word => !!word)

const sentenceFormatter = (sentence, language = 'ES') => {
    const actions = getActionsToExecuteForLanguage(language);
    return executeActions(sentence, actions);
}

module.exports = {
    sentenceFormatter,
}