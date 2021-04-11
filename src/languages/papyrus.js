/*
Language: Papyrus
Author: Pickysaurus <pickysaurus@gmail.com>
Description: Language definition for the Papyrus script language used in Bethesda games. 
Website: https://github.com/Pickysaurus/highlight.js-papyrus
*/


const NATIVE_OBJECTS = [
    "Form", "ActiveMagicEffects", "Alias", "ReferenceAlias", "LocationAlias",
    "Debug", "Game", "Math", "Utility", "Action", "Activator", "Flora",
    "Furniture", "TalkingActivator", "ActorBase", "Ammo", "Armor",
    "AssociationType", "Book", "Cell", "Class", "Container", "Door",
    "EffectShader", "Enchantment", "EncounterZone", "Explosion", "Faction",
    "FormList", "GlobalVariable", "Hazard", "Idle", "ImageSpaceModifier",
    "ImpactDataSet", "Ingredient", "Keyword", "LocationRefType", "LeveledActor",
    "LeveledItem", "LeveledSpell", "Light", "Location", "MagicEffect",
    "Message", "MiscObject", "Apparatus", "ConstructableObject", "Key",
    "SoulGem", "MusicType", "ObjectReference", "Actor", "Outfit",
    "Package", "Perk", "Potion", "Projectile", "Quest", "Race", "Scene",
    "Scroll", "Shout", "Sound", "SoundCategory", "Spell", "Static",
    "TextureSet", "Topic", "TopicInfo", "VisualEffect", "VoiceType",
    "Weapon", "Weather", "WordOfPower", "WorldSpace"
];

export default function(hljs) {
    const PROP_COMMENT = hljs.COMMENT(/\{/, /\}/); // Text between {} braces
    const SINGLE_LINE_COMMENT = hljs.COMMENT(/\;/); //Starts with ;
    const MULTI_LINE_COMMENT = hljs.COMMENT(/\\\;/, /\;\\/); // Starts with \; ends with ;\
    const STRING_OBJ = {
        clasName: 'string',
        begin: '"', end: '"'
    }; // "Text is always in double quotes"

    return {
        name: "Papyrus",
        aliases: ['papyrus', 'psc'],
        case_insensitive: true,
        keywords: ['endif', 'endwhile', 'endfunction', 'endevent', 'endstate'],
        contains: [
            PROP_COMMENT,
            SINGLE_LINE_COMMENT,
            MULTI_LINE_COMMENT,
            hljs.NUMEBER_MODE,
            {
                className: 'title',
                keywords: 'scriptname extends'

            },
            {
                className: 'type',
                keywords: NATIVE_OBJECTS
            },
            {
                className: 'function',
                begin: /(function|event)/, end: /(endfunction|endevent)/,
                contains: [
                    STRING_OBJ,
                    PROP_COMMENT,
                    SINGLE_LINE_COMMENT,
                    MULTI_LINE_COMMENT
                ]
            },
        ]
    }
}