const orientations = [
    [
        {
            name: "Aro-ace Spectrum",
            aliases: [
                "aspec", "ace-spec", "ace spectrum"
            ],
            definition: "A shortened version of asexual/aromantic spectrum; an umbrella term for the aromantic spectrum and the asexual spectrum.",
            flag: "https://pronouns-page.s3-eu-west-1.amazonaws.com/images/01EX5FA37QHQCEEBBC0W889ZEH-big.png"
        },
        {
            name: "Abrosexual",
            aliases: [
                "abro"
            ],
            definition: "A sexual orientation described by a fluid sexual attraction, meaning it can change frequently depending on one's mood or feelings.",
            flag: "https://app.ponjo.club/v1/pride/flags/abrosexual"
        },
        {
            name: "Asexual",
            aliases: [
                "ace"
            ],
            definition: "A sexual orientation characterized by lack of sexual attraction. Asexuals are often referred to as aces.",
            flag: "https://app.ponjo.club/v1/pride/flags/asexual"
        },
        {
            name: "Bisexual",
            aliases: [
                "bi"
            ],
            definition: "A sexual orientation characterized by sexual attraction towards two or more genders.",
            flag: "https://app.ponjo.club/v1/pride/flags/bisexual"
        },
        {
            name: "Ceterosexual",
            aliases: [],
            definition: "Sexual attraction towards non-binary people.",
            flag: "https://en.pronouns.page/flags/Ceterosexual.png"
        },
        {
            name: "Demisexual",
            aliases: [
                "demi"
            ],
            definition: "A sexual orientation on the asexual spectrum, characterized by sexual attraction once a strong emotional bond is formed.",
            flag: "https://app.ponjo.club/v1/pride/flags/demisexual"
        },
        {
            name: "Heterosexual",
            aliases: [
                "straight", "binary"
            ],
            definition: "Sexual attraction towards people of opposite genders.",
            flag: "https://app.ponjo.club/v1/pride/flags/heterosexual"
        },
        {
            name: "Homosexual",
            aliases: [
                "gay"
            ],
            definition: "Sexual attraction towards people of one's own gender.",
            flag: "https://app.ponjo.club/v1/pride/flags/gay"
        },
        {
            name: "Lesbian",
            aliases: [
                "sapphic"
            ],
            definition: "Commonly a homosexual woman; nowadays, the term sapphic is used.",
            flag: "https://app.ponjo.club/v1/pride/flags/lesbian"
        },
        {
            name: "Multisexual",
            aliases: [],
            definition: "An umbrella term referring to people sexual attracted towards more than one gender.",
            flag: "https://pronouns-page.s3-eu-west-1.amazonaws.com/images/01FBG1SP286W7XRW3AK8M49W7V-big.png"
        },
        {
            name: "Neptunic",
            aliases: [],
            definition: "Sexual attraction towards exclusively women and non-binary people.",
            flag: "https://pronouns-page.s3-eu-west-1.amazonaws.com/images/01EX5Q2RCWAWWNYFD0V72BT75V-big.png"
        },
        {
            name: "Omnisexual",
            aliases: [
                "omni"
            ],
            definition: "Sexual attraction towards all genders; however, unlike pansexuality, gender is still a factor (in other words, not gender-blind).",
            flag: "https://app.ponjo.club/v1/pride/flags/omnisexual"
        },
        {
            name: "Pansexual",
            aliases: [
                "pan"
            ],
            definition: "Sexual attraction towards all people, regardless of gender (gender-blind).",
            flag: "https://app.ponjo.club/v1/pride/flags/pansexual"
        },
        {
            name: "Polysexual",
            aliases: [],
            definition: "Sexual attraction towards multiple (but not necessarily all) genders.",
            flag: "https://app.ponjo.club/v1/pride/flags/polysexual"
        },
        {
            name: "Sapphic",
            aliases: [
                "WLW"
            ],
            definition: "A term referring to women and non-binary people and their attractions to other women and non-binary people.",
            flag:"https://app.ponjo.club/v1/pride/flags/sapphic"
        },
        {
            name: "Sexuality Questioning",
            aliases: [
                "questioning"
            ],
            definition: "A term referring to one's discovering of their sexual attraction, and an identity connected to this process.",
            flag: "https://app.ponjo.club/v1/pride/flags/questioning"
        },
        {
            name: "Two-Spirited",
            aliases: [],
            definition: "An umbrella term for various genders other than male & female.",
            flag: "https://app.ponjo.club/v1/pride/flags/twospirit"
        }
    ],
    [
        {
            name: "Alloromantic",
            aliases: [],
            definition: "A person who experiences romantic attraction but not sexual attraction.",
            flag: "https://app.ponjo.club/v1/pride/flags/alloromantic"
        },
        {
            name: "Aromantic",
            aliases: [
                "aro"
            ],
            definition: "A person who does not experience romantic attraction and sees it as repulsive.",
            flag: "https://app.ponjo.club/v1/pride/flags/aromantic"
        },
        {
            name: "Biromantic",
            aliases: [
                "biro"
            ],
            definition: "Being romantically attracted towards people of more than one gender.",
            flag: "https://app.ponjo.club/v1/pride/flags/biromantic"
        },
        {
            name: "Demiromantic",
            aliases: [
                "demiro"
            ],
            definition: "A person who experiences romantic attraction only after forming an emotional bond with someone.",
            flag: "https://app.ponjo.club/v1/pride/flags/demiromantic"
        },
        {
            name: "Lesbiromantic",
            aliases: [],
            definition: "A women who experiences romantic attraction to other women or non-binary people.",
            flag: "https://app.ponjo.club/v1/pride/flags/lesbiromantic"
        },
        {
            name: "Monoromantic",
            aliases: [],
            definition: "Being romantically attracted to one gender.",
            flag: "https://app.ponjo.club/v1/pride/flags/monoromantic"
        },
        {
            name: "Omniromantic",
            aliases: [
                "omniro"
            ],
            definition: "Being romantically attracted towards all genders, but gender is a factor (not gender-blind).",
            flag: "https://app.ponjo.club/v1/pride/flags/omniromantic"
        },
        {
            name: "Panromantic",
            aliases: [
                "panro"
            ],
            definition: "Being romantically attracted to people regardless of gender.",
            flag: "https://app.ponjo.club/v1/pride/flags/panromantic"
        },
        {
            name: "Polyromantic",
            aliases: [
                "polyro"
            ],
            definition: "Being romantically attracted to multiple (but not necessarily all) genders.",
            flag: "https://app.ponjo.club/v1/pride/flags/polyromantic"
        }
    ],
];

export default orientations;