const sites = [
    {
        name: "Site-01",
        alias: "Protected Site-01, Overwatch HQ",
        description: "Site-01 is a safe zone that acts as a data backup for all major Foundation facilities worldwide as well as a secure meeting facility for O5 Council members and other high-ranking Foundation personnel. As with all Protected Sites, no anomalies of any kind are allowed in proximity of Site-01. The location of Site-01 is strictly classified."
    },
    {
        name: "Site-06-3",
        alias: "Humanoid Containment Site-06-3",
        description: "Site-06-3 is a containment facility that is currently located in the Lorraine region of France. Formerly located in the United States (Site-06) and Germany (Site-06-2), this facility was moved to its current location following the decommission and demolition of the aforementioned previous facilities. Site-06-3 employs a multi-national staff and houses numerous low-risk human and humanoid entities, most notably several former Foundation personnel. Objects contained at this facility include: SCP-069, SCP-706, SCP-1669, and SCP-1702."
    },
    {
        name: "Site-11",
        alias: null,
        description: "Site-11 is a large-scale Foundation facility located in the mid-western United States consisting of an entire self-sustaining community including residential housing, commercial businesses, and industrial/manufacturing facilities as well as an extensive underground containment and research complex. The Foundation maintains strict tracking of all personnel and civilians within Site-11 and as such, the facility is often used as a safe location for personnel requiring additional security and protection. Objects contained at this facility include: SCP-986 and SCP-4332."
    },
    {
        name: "Site-15",
        alias: null,
        description: "Site-15 is a Foundation facility located on the United States west coast that specializes in the containment and study of electric, electronic, and computer-based anomalies. The primary storage and containment wings of Site-15 are electromagnetically isolated to prevent any interaction between anomalous electronics and the outside world. Objects contained at this facility include: SCP-079, SCP-719, SCP-896, and SCP-5241."
    },
    {
        name: "Site-17",
        alias: null,
        description: "Site-17 is a major Foundation facility primarily focused on the containment and study of low-risk humanoid entities. As per this focus, Site-17's permanent site staff includes a large number of medical and psychiatric professionals. Objects contained at this facility include: SCP-073, SCP-105, SCP-114, SCP-191, SCP-343, SCP-1005, SCP-2020, SCP-2240, SCP-4051, and SCP-4820."
    },
    {
        name: "Site-19",
        alias: null,
        description: "Site-19 is the largest Foundation facility currently in operation, housing hundreds of Safe- and Euclid-class anomalies. Objects contained at this facility include: SCP-055, SCP-131, SCP-173, SCP-387, SCP-668, SCP-931, SCP-1123, SCP-2598, SCP-3107, SCP-4057, SCP-6096, and SCP-6186."
    },
    {
        name: "Site-23",
        alias: null,
        description: "Site-23 houses a number of metamorphic or transfiguring biological objects and entities. Objects contained at this facility include: SCP-038 and SCP-113."
    },
    {
        name: "Site-28",
        alias: "Provisional Containment Site-28",
        description: "Site-28 is located in the SoHo neighborhood of New York City, New York, United States, and was initially established to contain SCP-602. Since then, this facility has been expanded into a full-fledged Foundation containment facility specializing in anomalous artwork and artifacts. Objects contained at this facility also include: SCP-1229 and SCP-1388."
    },
    {
        name: "Site-36",
        alias: null,
        description: "Formerly Provisional Site-36, this facility is located in India and serves as both a regional containment site as well as a support facility for field personnel operating in the area. Objects contained at this facility include: SCP-089 and SCP-1135."
    },
    {
        name: "Site-38",
        alias: null,
        description: "Site-38 is a containment site in rural Tennessee, United States, primarily focused on the study of Group of Interest 388-Alpha, \"Alexylva University\". Objects contained at this facility include: SCP-961, SCP-1080, SCP-1893, and SCP-1082."
    },
    {
        name: "Site-43",
        alias: "Research and Containment Site-43",
        description: "Site-43 is situated on the southeastern shore of Lake Huron, one kilometre below sea level in Ipperwash Provincial Park, Ontario, Canada. It comprises containment wings for low- to medium-risk anomalies, research divisions arranged in a pseudoacademic structure, and abatement refineries for esoteric substances. Objects contained at this facility include: SCP-5056, SCP-5109, SCP-5243, SCP-5382, SCP-5494 and SCP-5520."
    },
    {
        name: "Site-45",
        alias: "Research Site-45",
        description: "Site-45 is a clandestine armed research facility located off the coast of Western Australia under the Indian Ocean. Here, research and temporary containment of anomalous objects are conducted under guard and away from a civilian populace. Site-45 also serves as a staging point for MTF operations within the Pacific and Indian Oceans."
    },
    {
        name: "Site-54",
        alias: "Integrated Containment Site-54",
        description: "Site-54 is a containment facility located in, around, and beneath the city of Leipzig, Germany. Specialising in the containment of those anomalies deemed 'partially uncontainable', the Site's staff are heavily armed, highly trained, and permanently on edge. Featuring an extensive rapid-response vehicle hangar (with transport both normal and anomalous) and wide array of holding cells, Site-54 is generally considered to be the Foundation site both best-prepared for the worst to happen, and the location at which said worst is most likely to occur."
    },
    {
        name: "Site-56",
        alias: null,
        description: "Established in the Black Rock Desert of Nevada, May 1972, Site-56 was intended to serve as the base of operations for the enactment of the Kraken Protocol within the American Southwest. Over time, Site-56 took on increasing responsibilities, eventually transitioning into a full-fledged containment and administration site, responsible for select offsite anomalies such as SCP-5994 and SCP-5952. However, recent Overwatch audits suggest its expansion has surpassed its budgetary and logistical limitations, and personnel frequently cite its \"labyrinthine\" structure as a detriment to day-to-day operations."
    },
    {
        name: "Site-62",
        alias: "Dimensional Site-62",
        description: "Formerly Provisional Site-62, this facility was initially built around SCP-004. The facility was eventually expanded to house other objects requiring high-security Dimensional Containment, back up critical Foundation data, and provide an external reference point for detecting and reporting reality shifts."
    },
    {
        name: "Site-64",
        alias: "Storage Site-64",
        description: "Located approximately 0.5 km below Forest Park, northwest of Portland, Oregon, Site-64 is primarily a low to medium security storage facility, and is mainly used to house minor anomalous items, and Safe/Euclid class objects confiscated from the anomalous art community and anomalous electronics industry based in Portland and Vancouver."
    },
    {
        name: "Site-66",
        alias: "Biological Containment Site-66, Bio-Site-66",
        description: "Originally built as Provisional Site-66 around SCP-1479, this facility was eventually expanded to contain and research biological and organic anomalies."
    },
    {
        name: "Site-73",
        alias: null,
        description: "Site-73 is a facility converted from an office building in Texas, designed for the containment and study of inert, Safe-class, or otherwise benign anomalous objects, including the analysis and storage of deceased specimens. The Site also manages satellite facilities such as Storage Location 73-E."
    },
    {
        name: "Site-76",
        alias: "Reliquary Research and Containment Site-76",
        description: "Site-76 is a major containment site located in the United States of America, housing a large number of anomalous objects presumed to be man-made."
    },
    {
        name: "Site-77",
        alias: "Storage Site-77",
        description: "One of the Foundation's largest storage facilities, Site-77 was initially built in 1924 in southern Italy and served as an Italian facility until the second World War, when it was damaged by Allied bombing and subsequently destroyed by a containment breach. Site-77 was taken over by the Foundation and rebuilt in 1944."
    },
    {
        name: "Site-81",
        alias: "Research and Containment Site-81",
        description: "Located beneath Lake Monroe in Bloomington, Indiana, Site-81 is the primary hub for anomalous activity in the United States Midwest. Initially founded as an expeditionary site to monitor SCP-2812, Site-81 has since grown to become one of the largest sites in the region. Located within is the Foundation's Classifications Department, as well as a massive Mobile Task Force deployment outpost."
    },
    {
        name: "Site-87",
        alias: "Research Site-87",
        description: "Site-87 is a research site, established in September 1976 to oversee containment of a minor anomaly in the town of Sloth's Pit, Wisconsin, USA (pop. 17,291 as of 2020). In that same month, researchers discovered that Sloth's Pit was a highly active Nexus, an inhabited zone with a high concentration of anomalous phenomena. Site-87's civilian front is S & C Plastics, and it possesses its own Task Force— Sigma-10, \"The Sloth's Arm\", for containment of anomalies within city limits. Citizens of Sloth's Pit are considered E-Class Personnel, and have knowledge of the Foundation insofar as 'a research organization is monitoring the town'. The primary goal of Site-87 is to research and catalog anomalies in Sloth's Pit, such as SCP-4040; however, it is also the headquarters of the Department of Multi-Universal Affairs, Nexological Studies, and serves as regional command for the Midwestern USA."
    },
    {
        name: "Site-88",
        alias: "Humanoid Containment Site-88",
        description: "Humanoid Containment Site-88 is located in central Baldwin County, Alabama. The site houses many humanoid SCP objects, along with several high value anomalous items. While research is not a primary focus of the site, the site has the capacity for it, and has seen many research projects related to its occupants."
    },
    {
        name: "Site-91",
        alias: "Xenobiological Research and Containment Site-91",
        description: "Established as Provisional Site-91 in 1986 shortly after the discovery of SCP-4612 in the substructure below a manor known as Eckhart House in Yorkshire, England. The Site was fully commissioned by Overwatch command the following year and was expanded into a full containment facility, research lab and library focused on the containment and analysis of xenobiological specimens, with a secondary focus of the development of thaumaturgical countermeasures and containment of thaumaturgical artifacts. Serves as the primary station for MTF-Beta-777 (“Hecate’s Spear”)."
    },
    {
        name: "Site-95",
        alias: "Biological Research and Containment Site-95, Bio-Site-95",
        description: "Site-95 is a small but well equipped site used to contain and research biological and organic anomalies."
    },
    {
        name: "Site-98",
        alias: "Dimensional Research Site-98",
        description: "Site-98 serves as the forefront of Foundation technology. Stationed in the city of Philadelphia, Site-98 is responsible for the bleeding-edge technological developments and innovations that help the Foundation contain, analyze, and research the various anomalous threats that endanger the world. Site-98 is often considered as the most technologically-advanced research facility in the Foundation."
    },
    {
        name: "Site-103",
        alias: "Biological Containment Site-103",
        description: "Site-103 has extensive facilities for the containment and research of plant and plant-based anomalies."
    },
    {
        name: "Site-104",
        alias: "Biological Research Site-104",
        description: "Formerly Provisional Site-104, this facility is operated under the guise of a wildlife preserve and is designed for study of and experimentation on biological anomalies with wide-ranging effects."
    },
    {
        name: "Site-120",
        alias: "Research and Reliquary Dimensional Containment Site-120",
        description: "Built atop SCP-5292 near the city of Częstochowa, Poland, Site-120 specializes in thaumaturgic, ontokinetic, and theological anomalies, utilizing unusual containment methods to deal with them. Being one of the few Sites actively encouraging the usage of the anomalous, it acts as the main observation point for the Free Port of Esterberg."
    },
    {
        name: "Site-228",
        alias: null,
        description: "Site-228 is a major Central European containment facility, and one of the first Foundation facilities to be located in Hungary. It was originally designed for humanoid containment, but following modernization it is now also capable of containing sapient non-humanoid entities."
    },
    {
        name: "Site-246",
        alias: null,
        description: "Site-246 is located beneath Lake Superior, and was formerly the regional command of the American Midwest prior to its relocation to Site-87. The Site was used as the Headquarters for MTF-Delta-3 (\"Solomon's Hand\") as part of the Special Asset Task Force Program, but the Task Force was disbanded following the defection of the special asset. The Site is now only used as a training center and underwater research facility."
    }
];

export default sites;