/*
Language: Papyrus
Author: Pickysaurus <pickysaurus@gmail.com>
Description: Language definition for the Papyrus script language used in Bethesda games. 
Website: https://github.com/Pickysaurus/highlight.js-papyrus
*/


export default function(hljs) {
    const PROP_COMMENT = hljs.COMMENT(/\{/, /\}/); // Text between {} braces
    const SINGLE_LINE_COMMENT = hljs.COMMENT(/\;/); //Starts with ;
    const MULTI_LINE_COMMENT = hljs.COMMENT(/\\\;/, /\;\\/); // Starts with \; ends with ;\

    return {
        name: "Papyrus",
        aliases: ['papyrus', 'psc'],
        case_insensitive: true,
        keywords: ['endif', 'endwhile', 'endfunction', 'endevent', 'endstate'],
        contains: [
            PROP_COMMENT,
            SINGLE_LINE_COMMENT,
            MULTI_LINE_COMMENT,
            {
                className: 'string',
                begin:'"', end: '"'
            },
        ]
    }
}