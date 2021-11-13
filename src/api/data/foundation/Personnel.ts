const personnel = [
    {
        name: "Dr. Daniel Asheworth",
        about: "Thaumaturgist and self-proclaimed alchemist. Stubborn, temperamental, and sometimes arrogant, though usually useful just enough to escape disciplinary action. Born from an unknown American mother and an unknown Polish father in the late 1950s. One of few people in the Foundation capable of prolonging their youth through anomalous means." + "\n\n" + "Lead of the Damien Nowak Case. Believed to once have had been a temporary member of the Wanderers' Library and Wilson's Wildlife Solutions, Daniel Asheworth has proven numerous times to be a useful asset in Site-120's Director Council."
    },
    {
        name: "Doctors Thomas, Trevor and Tristan Bailey",
        about: "Identical triplets employed by the Foundation. Sons of Tyler Bailey, inventor of the Multi-Universal Transit Array. Employed by the Foundation for an unknown period of time (employee records and personal accounts differ), and look anywhere between 20 and 40 as a side effect of constantly crossing universal barriers." + "\n\n" + "Trevor Bailey is the former head of the Department of Multi-Universal Affairs, before being demoted to a desk job at Site-19 for mishandling of a Keter-class anomaly. Tom “Bombadill” Bailey is currently the commissioner of Site-1483 (within the Antarctic Empire), following a career spent exploring alternate universes. Tristan Bailey is a physicist, diplomat and designer of a multi-universal translator. Formerly assigned to [REDACTED], currently stationed at Site-87.",
    },
    {
        name: "Dr. Django Bridge",
        about: "Foundation Archivist. Quiet but influential, with a touch of both melancholy and whimsy. Extraordinary memory. On a first-name basis with Dr. Bright, and has frequently acted as an informal assistant for him.",
    },
    {
        name: "Dr. Jack Bright",
        about: "Director of Foundation Personnel. Somewhat amoral. Extremely loyal to the Foundation. May be ridiculous, may be terrifying; is certainly blunt. Attached to SCP-963, and is therefore immortal, using the body of whatever SCP-963 has last touched.",
    },
    {
        name: "Dr. Jeremiah Cimmerian",
        about: "An ethics committee liaison that takes his job only somewhat seriously. He never thought his doctorate in English Literature or his minor in philosophy would actually help him stay employed, but the former got him recruited into the Foundation as a researcher and the latter secured his employment in the long term. Has an unusual interest in puns and the ethical treatment of humanoids.",
    },
    {
        name: "Dr. Alto Clef",
        about: "Enigmatic and genre-savvy. A highly adaptable, clever liar. Former Global Occult Coalition (GOC) operative, specializing in reality benders. Also former file clerk. Undergone anomalous alterations that provide resistance to reality shifts and prevent his face from being photographed. Has a long and checkered history, a flair for the dramatic, and a somewhat hidden streak of self-hatred. Reformed misogynist. Most rumors about him are exaggerated or off-point."
    },
    {
        name: "Dr. Kain \"Pathos\" Crow",
        about: "Cross-disciplinary wunderkind researcher, specializing particularly in biochemistry and robotics. Rarely, if ever, seen in public. May or may not have been permanently transformed into a dog-like body as the result of a particular anomalous event."
    },
    {
        name: "Dr. Dan XXXXXXX",
        about: "Insufferable, emotive genius with a big-picture-centric set of principles. Former marine. Lead researcher on an SCP too dangerous to keep around, but couldn't make the O5 Council see it that way. Took matters into his own hands, getting dozens of people killed, getting his decommissioning request accepted, and getting a death sentence (in that order)."
    },
    {
        name: "Dr. Michael Edison",
        about: "Level-3 Researcher, current head of the Foundation's Inter-Site Testing Initiative (ISTI). Dr. Edison has received disciplinary action on multiple occasions due to a repeated pattern of unsanctioned and ill-conceived behavior. These behaviors have resulted in temporary reassignment to the Site-XX Antarctic base. His current assignment at Site 19 is contingent on approval from his assigned therapist."
    },
    {
        name: "Dr. Chelsea \"Photosynthetic\" Elliott",
        about: "Plant specialist, both anomalous and non-anomalous. Dedicated, friendly, prone to tunnel vision. Often in the field; excessively 'hands-on' in her lab and field research, leading to a number of injuries. Scars cover her hands and arms."
    },
    {
        name: "Dr. Justine 'Jay' Everwood",
        about: "GoI specialist, very well-read and knowledgeable on the many groups of interests the Foundation faces. Is particularly interested in Dr. Wondertainment and Wilson's Wildlife Solutions. Is generally approachable but is often lost in thought, be they mundane or fantastical."
    },
    {
        name: "Dr. Joe Fynegan",
        about: "Expert on ARBH Class Event Scenarios, AKA \"Insect Hell\" extinction-level events."
    },
    {
        name: "Dr. Charles Gears (\"COG\")",
        about: "A man strangely lacking in emotional response (to the point of lacking a startle response) and possessing unusual levels of logic and intellect. Former Euclid-class object specialist before having his area of study expanded. Has been deeply involved with research regarding a truly shocking number of SCP objects both major and minor. A figure of great influence in recent Foundation history."
    },
    {
        name: "Dr. Simon Glass",
        about: "Head of Psychology. Trusted with performing psychological evaluations of highly ranked Foundation personnel. Very empathetic. Sometimes considered \"soft\" — and that's true, for a Foundation researcher, but he's still well-trusted. In the course of his interviews, he has gained knowledge of more and more terrible secrets, yet still holds on to both his sanity and empathy."
    },
    {
        name: "Dr. Frederick Heiden",
        about: "Neurology specialist. Anxious, uncertain, empathic, focused on logic. Involved in a number of highly classified projects, despite initially being barred from any non-Safe-classed objects."
    },
    {
        name: "Doctor Hoygull",
        about: "Sapient seagull. Head of the Foundation's Avian Division, commanding MTF-Eta-4, \"Begone Thoth\"."
    },
    {
        name: "Dr. Everett King:",
        about: "One of the Foundation's most experienced mathematicians, Doctor King's reputation has nevertheless been overtaken by his testing record involving unusual results. Despite this, he regularly contributes to internal Foundation intellectual periodicals."
    },
    {
        name: "Dr. Mark Kiryu",
        about: "Senior researcher and director of an anomalous items processing lab. Upon initial recruitment, had a successful career as a therapist (licensed psychologist). Worked extensively with SCP-1457 in his first years with the Foundation but doesn't talk about that, and has spearheaded several projects involving sapient SCP entities. Cheery attitude and a good listener; looks out for his coworkers and interns like a bit of a mother hen sometimes. Has a ceramic seahorse and potted bamboo on his desk."
    },
    {
        name: "Dr. Zyn Kiryu",
        about: "Highly prolific researcher. Involved in a number of classified Foundation projects. Obsessive, driven, often not eating or sleeping in favor of finishing tasks. Finished her schooling through an accelerated program after joining the Foundation. Initially closed-off and withdrawn, but opened up due to a latent ambitious streak. She often volunteers to handle new Foundation member intake, hoping to give new members a positive introduction to an often deeply horrifying organization. Has a private flair for poetry. Has accidentally inherited the absent Dr. Kondraki's affiliation with anomalous butterflies, including SCP-408 after Kondraki's disappearance."
    },
    {
        name: "Dr. Adam Leeward",
        about: "Emotionally confused and ethically conflicted humanoid containment specialist from Site-11, living in Site-81. May or may not have made a few mistakes, may or may not have cleaned up a few mistakes. Not without the standard degree of coldness in personality traits, but with a few (sometimes painful) soft spots."
    },
    {
        name: "Dr. Sophia Light",
        about: "Biologist, surgeon and Site Director with far, far too many secrets. A likeable yet frightening person. Blunt, determined, calculating; good under pressure. Putting effort into remaining friendly and open (and emotionally stable). Bears minor facial scarring, and an old injury in her left hand sometimes impairs its functionality. Somewhat traumatic childhood; caretakers forced her to learn outdoor survival by leaving her stranded in the African wilderness for days on end. Joined the Foundation after a classified anomalous incident that killed eleven people, including her then-fiancee. Currently or formerly romantically linked with Troy Lament."
    },
    {
        name: "Dr. Judith Low",
        about: "Senior Advisor at the Department of History. Specialises in the religious practices known as Sarkicism, and involved in the containment of SCP-2133, SCP-2191 and SCP-2480."
    },
    {
        name: "Dr. Connor MacWarren",
        about: "Active researcher focusing on the development of anomalous technologies on top of being one of the board of directors at Site-98 in Philadelphia. Currently oversees his own department specializing in extradimensional anomalies. Humble, sarcastic, irritable, and absolutely loathes having to repeat himself every time anyone mishears his dry jokes. Former member of the Marine Corps. with a highly-prolific GOC agent for a father, now estranged."
    },
    {
        name: "Dr. Everett Mann",
        about: "Unconventional medical researcher with few scruples and a specialty in unusual forms of surgery. Jokingly referred to as a \"mad scientist\". (He objects to the term \"mad scientist\", claiming that \"mad doctor\" would be more accurate, and further that the difference should be plain to anyone with a proper academic background to speak of.) Willing to do monstrous things in the name of research. Possesses a dramatic moustache. Due to his upbringing, his cultural and popular knowledges are woefully out of date, leading to anachronistic and ridiculous situations."
    },
    {
        name: "Dr. Jaime Marlowe",
        about: "Average researcher, specializing in space-time, extra-dimensional, visual, spatial, and cognitohazardous anomalies. Previously described as \"painfully, painfully, painfully average\", notable more for minor interpersonal incidents and inappropriate outbursts when under stress. Marlowe's profile has slightly increased due to apparent unexplained connections to unrelated anomalous events which only appear to have increased in frequency."
    },
    {
        name: "Dr. Placeholder McDoctorate",
        about: "Head of the 'Pataphysics Department. Initially hired by the I.T. department, promoted to Department Head in 1996 for notable performance in the containment of SCP-5241. Promoted to Site Director, then personally requested reassignment to the 'Pataphysics Department. Promoted to Department Head for notable developments in Theoretical 'Pataphysics, then founded the Archetypicals Division. At some point, had his name retroactively abstracted by SCP-INTEGER."
    },
    {
        name: "Dr. Riven Mercer",
        about: "Veterinary-focused researcher, second-in-command of Kiryu Labs. Handles personnel allocation for incoming anomalous item caches, often goes on outside assignments. Good with animals, owns a grumpy bearded dragon lizard who lives in the lab."
    },
    {
        name: "Dr. Katherine Sinclair",
        about: "Acting head - and one of only two members - of the Occult Studies and Thaumatology division at Site-87 in Sloth's Pit, Wisconsin. Has been involved in numerous incidents, including the assault on Sloth's Pit by the now defunct Group of Interest Satyr's Reign, and the 2014 Christmas Incident. Has burn scars on her forearms from a botched flame ritual."
    },
    {
        name: "Dr. Johannes Sorts",
        about: "Memetic specialist and field researcher, with a doctorate in art history. Caucasian, late 30s, unshaven with greying brown hair. Slightly overweight, usually wears a grey cap. Obsessive, cowardly and paranoid in mundane situations, but solid and focused when presented with memetic or information based hazards. Multiple disciplinary reports due to poor choice of action under pressure, including the shooting of a guard while under my influence. Currently under psychiatric evaluation and restricted to safer projects."
    },
    {
        name: "Dr. Thaddeus Xyank",
        about: "Presently low-level but extremely significant Foundation researcher. Specializes in temporal anomalies. Somewhat arrogant and long-winded, but considered an up-and-coming genius."
    }
];

export default personnel;