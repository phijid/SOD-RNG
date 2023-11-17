const {Client, IntentsBitField, EmbedBuilder,GatewayIntentBits, ActivityType  } = require('discord.js');
const { prefix, token, version } = require("./config.json");

const raceClassData  = [
    {
        "Race": "Human",
        "Classes": [
            "Mage",
            "Paladin",
            "Priest",
            "Rogue",
            "Warlock",
            "Warrior"
        ],
        "Faction": "Alliance"
    },
    {
        "Race": "Gnome",
        "Classes": [
            "Mage",
            "Rogue",
            "Warrior",
            "Warlock"
        ],
        "Faction": "Alliance"
    },
    {
        "Race": "Night Elf",
        "Classes": [
            "Druid",
            "Hunter",
            "Priest",
            "Rogue",
            "Warrior"
        ],
        "Faction": "Alliance"
    },
    {
        "Race": "Dwarf",
        "Classes": [
            "Hunter",
            "Paladin",
            "Priest",
            "Rogue"
        ],
        "Faction": "Alliance"
    },
    {
        "Race": "Orc",
        "Classes": [
            "Hunter",
            "Rogue",
            "Shaman",
            "Warlock",
            "Warrior"
        ],
        "Faction": "Horde"
    },
    {
        "Race": "Tauren",
        "Classes": [
            "Druid",
            "Hunter",
            "Shaman",
            "Warrior"
        ],
        "Faction": "Horde"
    },
    {
        "Race": "Troll",
        "Classes": [
            "Hunter",
            "Mage",
            "Priest",
            "Rogue",
            "Shaman",
            "Warrior"
        ],
        "Faction": "Horde"
    },
    {
        "Race": "Undead",
        "Classes": [
            "Mage",
            "Priest",
            "Rogue",
            "Warlock",
            "Warrior"
        ],
        "Faction": "Horde"
    }
]

const classSpecsData  = [
    {
        "name": "Druid",
        "color": "#FF7C0A",
        "icon": "https://cdn.discordapp.com/emojis/551626908811526157.webp",
        "specs": [
            {
                "name": "Balance",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/druid/balance.png"
            },
            {
                "name": "Feral",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/druid/feral.png"
            },
            {
                "name": "Bear",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/druid/guardian.png"
            },
            {
                "name": "Restoration",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/druid/restoration.png"
            }
        ]
    },
    {
        "name": "Hunter",
        "color": "#AAD372",
        "icon": "https://cdn.discordapp.com/emojis/551626919339098112.webp",
        "specs": [
            {
                "name": "Beast Mastery",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/hunter/beastmastery.png"
            },
            {
                "name": "Marksmanship",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/hunter/marksman.png"
            },
            {
                "name": "Survival",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/hunter/survival.png"
            }
        ]
    },
    {
        "name": "Mage",
        "color": "#3FC7EB",
        "icon": "https://cdn.discordapp.com/emojis/551626949500469248.webp",
        "specs": [
            {
                "name": "Arcane",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/mage/arcane.png"
            },
            {
                "name": "Fire",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/mage/fire.png"
            },
            {
                "name": "Frost",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/mage/frost.png"
            },
            {
                "name": "Healer",
                "icon": "https://cdn.discordapp.com/emojis/551626949500469248.webp"
            }
        ]
    },
    {
        "name": "Paladin",
        "color": "#F48CBA",
        "icon": "https://cdn.discordapp.com/emojis/551626962724978688.webp",
        "specs": [
            {
                "name": "Holy",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/paladin/holy.png"
            },
            {
                "name": "Protection",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/paladin/protection.png"
            },
            {
                "name": "Retribution",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/paladin/retribution.png"
            }
        ]
    },
    {
        "name": "Priest",
        "color": "#FFFFFF",
        "icon": "https://cdn.discordapp.com/emojis/551626984506261505.webp",
        "specs": [
            {
                "name": "Discipline",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/priest/discipline.png"
            },
            {
                "name": "Holy",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/priest/holy.png"
            },
            {
                "name": "Shadow",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/priest/shadow.png"
            }
        ]
    },
    {
        "name": "Rogue",
        "color": "#FFF468",
        "icon": "https://cdn.discordapp.com/emojis/551627007985975296.webp",
        "specs": [
            {
                "name": "Assassination",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/rogue/assassination.png"
            },
            {
                "name": "Combat",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/rogue/combat.png"
            },
            {
                "name": "Subtlety",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/rogue/subtlety.png"
            },
            {
                "name": "Tank",
                "icon": "https://cdn.discordapp.com/emojis/551627007985975296.webp"
            }
        ]
    },
    {
        "name": "Shaman",
        "color": "#0070DD",
        "icon": "https://cdn.discordapp.com/emojis/551626996522811395.webp",
        "specs": [
            {
                "name": "Restoration",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/shaman/restoration.png"
            },
            {
                "name": "Enhancement",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/shaman/enhancement.png"
            },
            {
                "name": "Elemental",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/shaman/elemental.png"
            },
            {
                "name": "Tank",
                "icon": "https://cdn.discordapp.com/emojis/551626996522811395.webp"
            }
        ]
    },
    {
        "name": "Warlock",
        "color": "#8788EE",
        "icon": "https://cdn.discordapp.com/emojis/551627234104967216.webp",
        "specs": [
            {
                "name": "Affliction",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/warlock/affliction.png"
            },
            {
                "name": "Demonology",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/warlock/demonology.png"
            },
            {
                "name": "Destruction",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/warlock/destruction.png"
            },
            {
                "name": "Tank",
                "icon": "https://cdn.discordapp.com/emojis/551627234104967216.webp"
            }
        ]
    },
    {
        "name": "Warrior",
        "color": "#C69B6D",
        "icon": "classicon_warrior",
        "specs": [
            {
                "name": "Arms",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/warrior/arms.png"
            },
            {
                "name": "Fury",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/warrior/fury.png"
            },
            {
                "name": "Protection",
                "icon": "https://raw.githubusercontent.com/orourkek/Wow-Icons/master/images/spec/warrior/protection.png"
            }
        ]
    }
]

// Global object to store all specs
const allSpecs = {};

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
   
});

client.login(token);

function getRandomSpec(faction) {
    // Get all specs for the specified faction
    const factionSpecs = Object.values(allSpecs).filter(spec => spec.faction.toLowerCase() === faction.toLowerCase());

    // Choose a random spec from the factionSpecs array
    const randomSpec = factionSpecs[Math.floor(Math.random() * factionSpecs.length)];

    // Get all races that have the selected class's spec
    const racesWithSpec = raceClassData
        .filter(entry => entry.Faction.toLowerCase() === faction.toLowerCase() && entry.Classes.includes(randomSpec.class))
        .map(entry => entry.Race);

    // Choose a random race from the racesWithSpec array
    const randomRace = racesWithSpec[Math.floor(Math.random() * racesWithSpec.length)];

    return {
        faction: faction,
        race: randomRace,
        class: randomSpec.class,
        spec: randomSpec.spec,
        color: randomSpec.color,
        icon: randomSpec.icon
    };
}

client.once("ready", () => {
    console.log("RNG HAS ENTERED!");
    client.user.setPresence({
        activities: [{ name: `Type $h or $help for info!`, type: ActivityType.Custom }],
        status: 'idle',
      });
    for (const raceClassEntry of raceClassData) {
        for (const selectedClass of raceClassEntry.Classes) {
            const classEntry = classSpecsData.find(entry => entry.name === selectedClass);
            for (const spec of classEntry.specs) {
                const specKey = `${raceClassEntry.Race} ${selectedClass} ${spec.name}`;
                //console.log(specKey);
                
                // Add spec to the global object
                allSpecs[specKey] = {
                    faction: raceClassEntry.Faction,
                    race: raceClassEntry.Race,
                    class: selectedClass,
                    spec: spec.name,
                    color: classEntry.color,
                    icon: spec.icon
                };
            }
        }
    }


    /*
    const comboCounts = {};

    for (let i = 0; i < 300; i++) {
        const randomSpec = getRandomSpec("horde");
        const comboKey = `${randomSpec.race}, ${randomSpec.spec} ${randomSpec.class}`;

        // Increment the count for the combo or initialize it to 1 if it doesn't exist
        comboCounts[comboKey] = (comboCounts[comboKey] || 0) + 1;

        //console.log(`${randomSpec.race}, ${randomSpec.spec} ${randomSpec.class}`);
    }

    const comboEntries = Object.entries(comboCounts);

    // Sort the array in descending order based on counts
    comboEntries.sort((a, b) => b[1] - a[1]);
    
    console.log("\nCombo Counts (Descending Order):");
    console.log(comboEntries);
    */
  });
  
  client.on("messageCreate", async (message) => {
    //console.log(message);    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {
        if (
          message.content.startsWith(`${prefix}help`) ||
          message.content.startsWith(`${prefix}h`)
        ) {
          console.log('Help')
          message.channel.send("- $spin Horde for Horde.\n- $spin Alliance for Alliance.\n- $spin for either faction")
          return;
        }    
        if (
          message.content.startsWith(`${prefix}spin`)
        ) {
            const args = message.content.split(' ');
            let faction = args[1];    
            
            if (faction == undefined){
                faction = Math.random() < 0.5 ? "alliance" : "horde";
            }

            faction = faction.toLowerCase();
            
            const randomSpec = getRandomSpec(faction);

            /*  
                console.log("Selected Faction:", randomSpec.faction);
                console.log("Selected Race:", randomSpec.race);
                console.log("Selected Class:", randomSpec.class);
                console.log("Selected Specs:", randomSpec.spec);
                console.log("Selected Color:", randomSpec.color);
                console.log("Selected Icon:", randomSpec.icon);
            */

            const result = new EmbedBuilder()
            .setColor(randomSpec.color)
            .setTitle('Your Result!')
            .setDescription(`<@${message.author.id}> RNG SAYS: ${randomSpec.race}, ${randomSpec.spec} ${randomSpec.class}`)
            .setThumbnail(randomSpec.icon)


            message.channel.send({ embeds: [result] });

            //message.channel.send(`<@${message.author.id}> RNG SAYS: ${selectedRace}, ${selectedSpecs.name} ${selectedClass} ${selectedSpecs.icon}`)
            return;
        }
        else {
          message.channel.send(
            ":warning: INVALID COMMAND type $help for list of commands :warning:"
          );
        }
      } catch (error) {
        message.channel.send(
          ":warning: INVALID COMMAND type $help for list of commands :warning:"
        );
        console.log(error);    
      }

  });




