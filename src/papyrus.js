/*
Language: Papyrus
Author: Pickysaurus <pickysaurus@gmail.com>
Description: Language definition for the Papyrus script language used in Bethesda games. 
Website: https://github.com/Pickysaurus/highlight.js-papyrus
*/


const NATIVE_OBJECTS = [
    'Form', 'ActiveMagicEffects', 'Alias', 'ReferenceAlias', 'LocationAlias',
    'Debug', 'Game', 'Math', 'Utility', 'Action', 'Activator', 'Flora',
    'Furniture', 'TalkingActivator', 'ActorBase', 'Ammo', 'Armor',
    'AssociationType', 'Book', 'Cell', 'Class', 'Container', 'Door',
    'EffectShader', 'Enchantment', 'EncounterZone', 'Explosion', 'Faction',
    'FormList', 'GlobalVariable', 'Hazard', 'Idle', 'ImageSpaceModifier',
    'ImpactDataSet', 'Ingredient', 'Keyword', 'LocationRefType', 'LeveledActor',
    'LeveledItem', 'LeveledSpell', 'Light', 'Location', 'MagicEffect',
    'Message', 'MiscObject', 'Apparatus', 'ConstructableObject', 'Key',
    'SoulGem', 'MusicType', 'ObjectReference', 'Actor', 'Outfit',
    'Package', 'Perk', 'Potion', 'Projectile', 'Quest', 'Race', 'Scene',
    'Scroll', 'Shout', 'Sound', 'SoundCategory', 'Spell', 'Static',
    'TextureSet', 'Topic', 'TopicInfo', 'VisualEffect', 'VoiceType',
    'Weapon', 'Weather', 'WordOfPower', 'WorldSpace'
]; //Base types found in the vanilla game(s).

const SCRIPT_EXT_OBJECTS = [
    'ColorComponent', 'FormType', 'GameData', 'Input', 'ModEvent', 'NetImmerse', 'SKSE',
    'SpawnerTask', 'StringUtil', 'UI', 'UICallback', 'WornObject', 'ActorValueInfo',
    'ArmorAddon', 'Art', 'ColorForm', 'CombatStyle', 'DefaultObjectManager', 'EquipSlot',
    'HeadPart', 'SoundDescriptor', 'TreeObject'
]; //Additional types introduced by the Script Extender applications.


const OPERATORS = {
    className: 'operator',
    relevance: 0,
    begin: /[+\-*/,;.:@~=><&|_`'^?!%]+/
  };


const KEYWORDS = {
    $pattern: /\w+/,
    keyword: ['Event', 'Function', 'EndEvent', 'EndFunction', 'State', 'EndState', 'extends', 'property', 'return'],
    built_in: ['if', 'as', 'elseif', 'endif', 'while', 'endwhile', 'auto', 'self'],
    type: [ ...NATIVE_OBJECTS, ...SCRIPT_EXT_OBJECTS],
    literal: ['false', 'true', 'NONE', 'string', 'bool', 'int']
}

export default function(hljs) {
    const PROP_COMMENT = hljs.COMMENT(/\{/, /\}/); // Text between {} braces
    const SINGLE_LINE_COMMENT = hljs.COMMENT(/\;(?!\/)/, /$/); //Starts with ; but not followed by a /
    const MULTI_LINE_COMMENT = hljs.COMMENT(/\;\//, /\/\;/, { relevance: 7 }); // Starts with ;/ ends with /;
    const STRING_OBJ = {
        className: 'string',
        begin: '"', end: '"',
        relevance: 0
    }; // 'Text is always in double quotes'

    const FUNCTION_BLOCK = {
        className: 'function',
        begin: /(w\+)?(function|event)/, end: /(endfunction|endevent)/,
        keywords: KEYWORDS,
        contains: [
            STRING_OBJ,
            PROP_COMMENT,
            SINGLE_LINE_COMMENT,
            MULTI_LINE_COMMENT,
            hljs.NUMBER_MODE,
            OPERATORS
        ]
    }

    return {
        name: 'Papyrus',
        aliases: ['papyrus', 'psc'],
        case_insensitive: true,
        keywords: KEYWORDS,
        contains: [
            PROP_COMMENT,
            SINGLE_LINE_COMMENT,
            MULTI_LINE_COMMENT,
            hljs.NUMBER_MODE,
            FUNCTION_BLOCK,
            STRING_OBJ,
            // Script Title
            {
                className: 'title',
                keywords: 'scriptname extends',
                relevance: 7,
                begin: /scriptname/

            },
            // States
            {
                className: 'class',
                begin: /^(?:auto )?state/, end: /endstate/,
                keywords: KEYWORDS,
                contains: [
                    FUNCTION_BLOCK,
                    SINGLE_LINE_COMMENT,
                    MULTI_LINE_COMMENT,
                    PROP_COMMENT
                ]
            }
        ]
    }
}