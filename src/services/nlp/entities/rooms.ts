import { EN } from "../util/constants";

// Room_Smalls:
// Room_Majestic:
// Room_Fox:
// Room_Shelter:
// Room_Joe:
// Room_Roller_Rink:
// Room_Outer_Rink:
// Room_Gem:
// Room_212_Room:
// Room_Filmore:

const roomId = "room";
const roomDefinitions: IEntityDefinition[] = [
  {
    id: "DTWSmalls@dynatrace.com",
    name: "DTW Small's (5 seats) 5th Floor Ford Field",
    synonyms: [
      "Smalls",
      "the Smalls room",
      "the Smalls",
      "smalls",
      "the smalls room",
      "the smalls"
    ]
  },
  {
    id: "dtwthemajestic@dynatrace.com",
    name: "DTW The Majestic (20 seats) 5th Floor Ford Field",
    synonyms: [
      "Majestic",
      "the Majestic",
      "the Majestic room",
      "majestic",
      "the majestic",
      "the majestic room"
    ]
  },
  {
    id: "dtwthefox5c-8@dynatrace.com",
    name: "DTW The Fox  (8 seats) 5th Floor Comerica Side",
    synonyms: [
      "fox",
      "the fox",
      "the fox room",
      "Fox",
      "the Fox",
      "the Fox room"
    ]
  },
  {
    id: "dtwshelter5F@dynatrace.com",
    name: "DTW The Shelter  (8 seats) 5th Floor Ford Field Side",
    synonyms: [
      "Shelter",
      "the Shelter",
      "the Shelter room",
      "shelter",
      "the shelter",
      "the shelter room"
    ]
  },
  {
    id: "DTWTheJoe5c-12@dynatrace.com",
    name: "DTW The Joe (12 seats) 5th Floor Comerica Side",
    synonyms: [
      "joe",
      "the joe",
      "the joe room",
      "Joe",
      "the Joe",
      "the Joe room"
    ]
  },
  {
    id: "DTWTheRollerRink@dynatrace.com",
    name: "DTW The Roller Rink (7 seats) 5th floor Comerica Side",
    synonyms: [
      "Roller rink",
      "the Roller Rink",
      "the Roller Rink room",
      "roller rink",
      "the roller rink",
      "the roller rink room"
    ]
  },
  {
    id: "DTWTheOuterRink@dynatrace.com",
    name: "DTW The Outer Rink (16 seats) 5th floor Comerica Side",
    synonyms: [
      "Outer Rink",
      "the Outer Rink",
      "the Outer Rink room",
      "outer rink",
      "the outer rink",
      "the outer rink room"
    ]
  },
  {
    id: "dtwthegem4C@dynatrace.com",
    name: "DTW The Gem  (8 seats) 4th Floor Comerica Side",
    synonyms: [
      "Gem",
      "the Gem",
      "the Gem room",
      "gem",
      "the gem",
      "the gem room"
    ]
  },
  {
    id: "dtwthe212room@dynatrace.com",
    name: "DTW The 212 Room  (20 seats) 5th Floor Ford Field Side",
    synonyms: [
      "212 Room",
      "the 212 Room",
      "the 212 Room room",
      "212 room",
      "the 212 room",
      "the 212 room room",
      "the 212",
      "212",
      "212 degree room"
    ]
  },
  {
    id: "dtwthefilmore4F@dynatrace.com",
    name: "DTW The Filmore  (8 seats) 4th Floor Ford Field Side",
    synonyms: [
      "Filmore",
      "the Filmore",
      "the Filmore room",
      "filmore",
      "the filmore",
      "the filmore room"
    ]
  }
];

function defToEntity(id: string): (IEntityDefinition) => EntityArguments {
  return (room: IEntityDefinition) => [id, room.id, [EN], room.synonyms];
}

const rooms = roomDefinitions.map(defToEntity(roomId));

interface IEntityDefinition {
  id: string;
  name: string;
  synonyms: string[];
}

type EntityArguments = [string, string, string[], string[]];

export { roomId, rooms, IEntityDefinition, EntityArguments };
