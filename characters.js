/* ============================================================
   CHARACTER MAP DATA: edit this file to change the map.
   - "about": who they are in Plutarch (from our reading)
   - "echo":  the Westworld parallel. These are SUGGESTIONS:
              the team should agree on them, rewrite, or delete.
              Leave echo out ("") and that line won't show.
   - "links": ids of characters they connect to
   ============================================================ */
const GROUPS = [
  { id: "tyrants",  label: "Tyrants",      sub: "and their Spartan backers" },
  { id: "rebels",   label: "Rebels",       sub: "Theban conspirators & returning exiles" },
  { id: "thinkers", label: "Philosophers", sub: "the debate on religion and philosophy" },
  { id: "family",   label: "House of Polymnis", sub: "teachers, sons, and the storyteller" },
];

const CHARACTERS = [
  // ---------- Tyrants ----------
  { id: "archias", group: "tyrants", name: "Archias",
    about: "Leader of the Spartan-backed tyrants ruling Thebes. The conspirators plan to catch him off guard at a drinking party.",
    echo: "Delos's management: the people who own the park and write everyone else's storylines.",
    links: ["leontiades", "spartans", "phyllidas"] },
  { id: "leontiades", group: "tyrants", name: "Leontiades",
    about: "Fellow tyrant alongside Archias, Philippus, Cabirichus, and Hypates.",
    echo: "", links: ["archias"] },
  { id: "spartans", group: "tyrants", name: "Spartan captains",
    about: "Lysanoridas, Herippidas, and Arcesus, who command the occupying forces that keep the tyrants in power.",
    echo: "The park's security teams: force that keeps the system running.",
    links: ["archias"] },

  // ---------- Rebels ----------
  { id: "phyllidas", group: "rebels", name: "Phyllidas",
    about: "Archias's own secretary, secretly a conspirator. He is the one luring Archias to the drinking party.",
    echo: "Felix and Sylvester: technicians who help the revolt from inside the system they work for.",
    links: ["archias", "charon"] },
  { id: "charon", group: "rebels", name: "Charon",
    about: "Conspirator who prepares to receive the exiles. Theocritus praises him for volunteering for great risks with \"no special education.\"",
    echo: "", links: ["phyllidas", "exiles", "theocritus"] },
  { id: "hipposthenidas", group: "rebels", name: "Hipposthenidas",
    about: "Conspirator who loses his nerve as the crisis nears and sends a rider to hold back the exiles.",
    echo: "", links: ["chlidon"] },
  { id: "chlidon", group: "rebels", name: "Chlidon",
    about: "The rider sent with that message, who never leaves: his wife had lent his horse's bridle to a neighbor. The plan survives by accident.",
    echo: "", links: ["hipposthenidas", "exiles"] },
  { id: "exiles", group: "rebels", name: "Pelopidas & Melon",
    about: "Leaders of the exiles secretly returning from Athens to overthrow the tyrants, with Pherenicus, Samidas, Melissus, Hismenodorus, and others.",
    echo: "Maeve and her crew: returning to break the system that holds them.",
    links: ["charon", "chlidon"] },

  // ---------- Philosophers ----------
  { id: "socrates", group: "thinkers", name: "Socrates",
    about: "Long dead, but the center of the debate. His daimonion, a private sign that turned him from certain actions, is the puzzle the others try to explain.",
    echo: "Dolores: a mind guided by a voice whose source she cannot see.",
    links: ["simmias", "galaxidorus"] },
  { id: "simmias", group: "thinkers", name: "Simmias",
    about: "The host, an old friend of Socrates who witnessed his death. He suggests the daimonion was not a vision but the perception of a voice.",
    echo: "", links: ["socrates", "theanor"] },
  { id: "theanor", group: "thinkers", name: "Theanor",
    about: "A Pythagorean from Croton; his name means \"man of god.\" He comes to see that Lysis was buried properly and to repay Polymnis with gold.",
    echo: "", links: ["simmias", "lysis", "epaminondas"] },
  { id: "galaxidorus", group: "thinkers", name: "Galaxidorus",
    about: "Philosopher in the debate over what Socrates' sign really was.",
    echo: "", links: ["socrates"] },
  { id: "theocritus", group: "thinkers", name: "Theocritus",
    about: "A seer. He worries that Epaminondas's philosophical training has made him passive, and contrasts him with brave, uneducated Charon.",
    echo: "", links: ["epaminondas", "charon"] },

  // ---------- House of Polymnis ----------
  { id: "polymnis", group: "family", name: "Polymnis",
    about: "Father of Epaminondas and Caphisias, who sheltered the exiled Pythagorean Lysis in his home.",
    echo: "", links: ["lysis", "epaminondas", "caphisias"] },
  { id: "lysis", group: "family", name: "Lysis",
    about: "A Pythagorean exile, now dead, who tutored Polymnis's sons. Theanor recognizes in Epaminondas \"the same daimon\" that guided Lysis.",
    echo: "Arnold: the dead teacher whose guidance keeps speaking through his students.",
    links: ["polymnis", "theanor", "epaminondas"] },
  { id: "epaminondas", group: "family", name: "Epaminondas",
    about: "General and philosopher. He refuses Theanor's honorable gift as training in self-control, and declines to join a revolt that will shed blood, though he shares its goal.",
    echo: "A foil to Dolores in the season-one finale: the same goal of liberation, but he refuses the violent route.",
    links: ["polymnis", "lysis", "theanor", "theocritus", "caphisias"] },
  { id: "caphisias", group: "family", name: "Caphisias",
    about: "Epaminondas's brother, a wrestler, and our narrator: he tells the whole story of the revolt.",
    echo: "", links: ["polymnis", "epaminondas", "archedemus"] },
  { id: "archedemus", group: "family", name: "Archedemus",
    about: "The Athenian friend who asks Caphisias for the story. He asks to hear it like a connoisseur studying a painting, looking for the details where virtue struggles against fortune.",
    echo: "Us, the viewers: watching the story and trying to read the minds inside it.",
    links: ["caphisias"] },
];
