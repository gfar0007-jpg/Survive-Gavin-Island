window.SGI_BUGS = [
 {
  "kind": "fix",
  "ver": "1.18",
  "found": "Found an issue where the Tab key and the I key were both wired to the same button, which was interfering with your Bookbag: pressing I could open the creative browser instead.",
  "fix": "Each key now does exactly one thing.",
  "date": "Oct 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.25",
  "found": "Found an issue where a block built on top of a door was interfering with the door, so it counted as solid even while it was open and players bounced off it.",
  "fix": "Doors now stay walkable whenever they are open, whatever is built above them.",
  "date": "Oct 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.25",
  "found": "Found an issue where the very first item in a brand new world was marking itself as equipped, which was interfering with the choice of what is in your hand.",
  "fix": "An item is only in your hand when you put it there.",
  "date": "Oct 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.25",
  "found": "Found an issue where the build reticle was aiming along a flat forward guess, which was interfering with the placement ghost that followed where you really look, so the two pointed at different spots.",
  "fix": "Both now use your real view, up and down included.",
  "date": "Oct 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.25",
  "found": "Found an issue where builds on sloped ground were sitting a little too high, which was interfering with the terrain underneath and left a sliver of sky.",
  "fix": "Builds on slopes now sit flush with the terrain.",
  "date": "Oct 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.30",
  "found": "Found an issue where the Player screen had grown taller than the window, which was interfering with the Close button and pushed it off the bottom of the screen on short or zoomed in windows.",
  "fix": "The Player screen now fits the window and the Close button stays where you can reach it.",
  "date": "Oct 16, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.33",
  "found": "Found an issue where terrain heights that did not line up with the build grid were interfering with placed blocks and the player's feet, so things floated or sank by a hair.",
  "fix": "Every terrain height is now aligned to the same grid the build system uses.",
  "date": "Oct 19, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.34",
  "found": "Found an issue where climbing out of the water was interfering with your jump speed and launched you high into the sky.",
  "fix": "Climbing out of the water now just climbs out.",
  "date": "Oct 20, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.34",
  "found": "Found an issue where the shoreline was interfering with monster pathing, so monsters walked up to the water and waited at the edge.",
  "fix": "Monsters now walk around water properly.",
  "date": "Oct 20, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.34",
  "found": "Found an issue where cacti, rocks and trees were spawning out in the water, which was interfering with the seabed and the coast.",
  "fix": "Nothing spawns in the water any more, and the seabed grows kelp and seaweed instead.",
  "date": "Oct 20, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.36",
  "found": "Found an issue where collision was checked against the drawn meshes, which was interfering with the real blocks, so you could clip through block corners.",
  "fix": "Collision now uses the real blocks: dug tunnels, placed blocks, doors, slabs and fences.",
  "date": "Oct 21, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.37",
  "found": "Found an issue where placing a block was interfering with mouse look, and the camera lurched sideways every time a block went down.",
  "fix": "Mouse look no longer jumps when you place blocks.",
  "date": "Oct 22, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.37",
  "found": "Found an issue where the adaptive resolution was dropping the render scale too eagerly, which was interfering with sharpness on high resolution screens.",
  "fix": "The render scale now only drops when the game really is slow.",
  "date": "Oct 22, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.37",
  "found": "Found an issue where builds were not part of the saved game, so they were interfering with loading and went missing.",
  "fix": "Your builds are now saved with your game.",
  "date": "Oct 22, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.40",
  "found": "Found an issue where a height only test for water was interfering with pits and caves, so a dry hole below sea level counted as the sea. You lost air, and digging deeper swept you back to the start.",
  "fix": "Only real sea and lake columns count as water now, so pits and caves are dry and the deep world is playable.",
  "date": "Oct 25, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.41",
  "found": "Found an issue where placing and breaking the same block was interfering with the XP rules, so it paid Mining or Woodcutting XP every time.",
  "fix": "Blocks you built yourself no longer give XP when you break them. Natural rock and trees pay out as before.",
  "date": "Oct 26, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.42",
  "found": "Found an issue where monsters, dropped items, buddies and the held item kept their daytime light, which was interfering with dark caves, so they glowed in the black.",
  "fix": "They now get dark when they are in the dark. Open daylight looks the same as before.",
  "date": "Oct 27, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where the Select World list stayed on top of the game after loading, which was interfering with Space: pressing it loaded the same world a second time and every villager appeared twice.",
  "fix": "The world list closes as soon as the game starts, and a running game cannot be launched again.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where Skeleton Mages and Ash Wraiths cast without line of sight, which was interfering with walls: bolts passed straight through solid blocks.",
  "fix": "Casters only fire when they can see you, bolts stop at the first solid block, and a bolt only hurts if it reaches your height.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where every animal was given the same set of parts, which was interfering with how they looked: cows had antlers, deer had horns and nobody had eyes.",
  "fix": "Only bucks have antlers, only bulls and rams have horns, and everyone has a face.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where the island and a floating hand were drawn behind the menus, which was interfering with the Loading screen.",
  "fix": "The menus have a plain cover, and a Loading world screen stays up until the ground around you is drawn.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where villagers and buddies could be heard from any distance, which was interfering with the quiet of the island.",
  "fix": "They are only heard when you are right next to them.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where new villager models were using up random numbers, which was interfering with the island layout: the same world name gave a different island.",
  "fix": "Each new model now uses its own private random numbers and burns exactly as many as the old one did, so the island matches again.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.45",
  "found": "Found an issue where the block outline and the block you placed used slightly different rays, which was interfering with placement: about one block in eight landed a cell away.",
  "fix": "Placement now uses the same exact ray as the outline.",
  "date": "Nov 3, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where animals, golems, Umbrath and the undead moved without animating, which was interfering with their legs and arms, so they glided over the ground.",
  "fix": "Legs and arms now swing by the distance really travelled and settle when they stop.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where frogs used the same walk as the other animals, which was interfering with how a frog moves.",
  "fix": "Frogs now sit, crouch and leap in an arc.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where a style rule for the air row was interfering with the hidden switch, so the bubbles stayed on screen on land.",
  "fix": "The air row now truly hides and only shows while you are in the water.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where the sea plane under the world was interfering with the new ravines, so anything deeper than sea level looked flooded.",
  "fix": "Ravines are kept dry and you can walk the bottom.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where trees and ore were growing without checking the ground, which was interfering with the new cave mouths: they hung in the air, and some trees were missing half their trunk.",
  "fix": "Features now check the ground under every cell before they grow, and buildings that cut into a tree remove the rest of it.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where the ore kinds were not evenly shared out, which was interfering with progression: lots of one ore in one place and almost none of the others.",
  "fix": "Every ore kind is spread across the island, and the rare ones are far apart and hard to find.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where a buddy mining a rock mid check was interfering with the terrain test, so one block did not match.",
  "fix": "The check sends the buddies home first.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where the fishing test looked for fish before they had time to bite, which was interfering with the result.",
  "fix": "The test now waits.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where the farm patch test still expected one crop, which was interfering with the four plots a patch has now.",
  "fix": "The test counts four plots.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where a mage hiding in the shade never burned, which was interfering with the sunrise test, so it waited forever.",
  "fix": "The test takes the shade away.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.46",
  "found": "Found an issue where a zombie rolling a helmet stopped burning, which was interfering with the sunrise test one time in fourteen.",
  "fix": "Gear rolls are now kept out of the world layout.",
  "date": "Nov 4, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where two recipes both needed exactly four Fiber, which was interfering with each other, so the table could not tell which one you meant.",
  "fix": "Thatch now needs 3 Fiber and 1 Stick.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where the new zombie, fishing spots and zombie gear were using the island's random numbers, which was interfering with the village: it got five cottages instead of four, and one had a tree growing through the room.",
  "fix": "They now use their own private random numbers while the island is laid out, then use up exactly the numbers the old ones did.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where Skeleton Mages could pick up zombie gear, which was interfering with sunrise: a mage in a zombie helmet walked around in daylight without burning.",
  "fix": "Only zombies pick up and wear swords and helmets. Mages carry staffs.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where monsters in the Test Site were burning at sunrise, which was interfering with the test setup where they are meant to stand all day.",
  "fix": "The Test Site marks every monster as sun-proof. Outside, they still burn at dawn.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where a death animation could finish before the test looked, which was interfering with the check.",
  "fix": "The test now waits for it.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where a house was built through a tree, which was interfering with the build.",
  "fix": "Trees now get out of the way.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where an icon was cut off at the edge of its square, which was interfering with how it looked.",
  "fix": "Padding was added.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.47",
  "found": "Found an issue where the wand was drawn the size of a tree, which was interfering with the held item.",
  "fix": "The scale was fixed.",
  "date": "Nov 5, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.51",
  "found": "Found an issue where the moon sat at the world centre in creative worlds, which was interfering with the sky: it showed up as a huge white dome.",
  "fix": "The moon is hidden in creative worlds.",
  "date": "Nov 9, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.51",
  "found": "Found an issue where silencing the placed Magic leaves was interfering with the Magic trees, which went quiet too.",
  "fix": "Magic trees keep their hum. Only placed Magic leaves are silent.",
  "date": "Nov 9, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.52",
  "found": "Found an issue where cat mews played as a far off background sound, which was interfering with the quiet around you.",
  "fix": "Kitten and cat mews only play when a cat is right beside you, within 7 blocks.",
  "date": "Nov 10, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.52",
  "found": "Found an issue where the bow curved toward you with the string on the wrong side, which was interfering with how it looked in the draw.",
  "fix": "The bow now faces the other way and bends away from you toward the middle of the screen.",
  "date": "Nov 10, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.52",
  "found": "Found an issue where a full hunger bar was not stopping you from eating, which was interfering with food.",
  "fix": "You can no longer eat when your hunger is full, and eating makes a munching sound.",
  "date": "Nov 10, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.54",
  "found": "Found an issue where the chunk streaming test meshed only a few chunks per slow round trip, which was interfering with the test finishing, so it hung.",
  "fix": "The test now pumps the mesh queue with a 400 ms budget.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.54",
  "found": "Found an issue where a test pond sat below the height map, which was interfering with the cube height check.",
  "fix": "The test now measures the real surface.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.54",
  "found": "Found an issue where chunks were unloaded during the shore plant test, which was interfering with the plant count: it found none.",
  "fix": "The test makes sure the chunk is loaded first.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.54",
  "found": "Found an issue where the bat nip, the dog bite and the pet sit tests were being interfered with by an ambient noise and a wandering cat, so they failed now and then.",
  "fix": "The tests wait properly and send the cat away. Ten clean runs in a row.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.54",
  "found": "Found an issue where the save tests pressed Play before the home screen was ready, which was interfering with the world list: the click timed out.",
  "fix": "A shared helper now waits for the world list to open.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.54",
  "found": "Found an issue where the character test still expected nine villagers, which was interfering with the four new traders.",
  "fix": "The test now expects thirteen and has a new triangle budget.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.55",
  "found": "Found an issue where the sapling growth test looked at a sapling that was not there yet, which was interfering with the run and crashed it.",
  "fix": "The test places its own sapling first.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.55",
  "found": "Found an issue where the turtle and the deer started too far away or too close in the animal habits test, which was interfering with the result now and then.",
  "fix": "The test repositions them and gives them more frames.",
  "date": "Nov 11, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where holding W and then pressing S was interfering with movement: the character just stopped until you let go of W.",
  "fix": "Walking now works like Minecraft: opposite keys cancel. If you prefer the newest key to win, there is a Settings switch for it.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the first person arm used a fixed blue sleeve and one skin colour, which was interfering with the look you picked: the hand stayed blue.",
  "fix": "The arm takes your skin colour, the sleeve your shirt colour, and it changes the moment you change your look.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where Vegetable Stew and Farmer's Pie had no picture of their own, which was interfering with the icons: they showed a placeholder.",
  "fix": "Both dishes have proper icons now.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where swords sat low and too close in the right corner, which was interfering with the view: the guard and grip were hidden behind the hotbar and the blade ran off the edge.",
  "fix": "Swords now sit higher and more upright so the whole sword shows, with the guard just above the hotbar.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where a wide grey column of light and a ring of dark rocks around the vents and altars were interfering with how they look: the magic seemed to sit on top of the ground instead of coming out of it.",
  "fix": "The column and the ring are gone. The ground is now cracked and glows in the element's colour, magic pours out of the cracks, and wind curls up to the floating stones.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where bows were a smooth single colour with round cream tips, which was interfering with how a bow looks.",
  "fix": "Bows now have wood grain lines along the limbs, and the ends are cut logs in the style of the Magic tree: bark on the side, blue rings on the end.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where an alt tab was interfering with held keys: the game missed the key release and you kept running by yourself.",
  "fix": "The game lets go of every key when the window loses focus.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the fall damage test was interfering with healing: health regenerated during the fall, so a 5 block fall read as a gain.",
  "fix": "The test stops regeneration while it measures.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the right button hold test aimed at a tree leaf, which was interfering with placing: it said \"You're standing there\".",
  "fix": "The test picks a direction where a block can really be placed.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where kills dropped their loot on the ground, which was interfering with the cave crawler loot test that looked in the bookbag.",
  "fix": "The test counts the items on the floor as well.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the Bone Knight became a night boss and enemy attack levels came from creature levels, which was interfering with the night tests that still expected the old mix.",
  "fix": "The tests now describe the combat plan.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the swim test dropped the player at the surface, which was interfering with the water check: a slow computer left him wading.",
  "fix": "The test starts below the surface.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the loading cover's 15 second safety valve was interfering with the loading test on a slow renderer, so it let the cover go before the ground was drawn.",
  "fix": "The test lengthens the valve. Players keep the 15 second limit.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the terrain test only looked 12 blocks above the ground, which was interfering with tall Magic trees, so one column looked too high.",
  "fix": "The test now looks 20 blocks up.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.56",
  "found": "Found an issue where the updates test had the newest version written in, which was interfering with every new update.",
  "fix": "It now follows the latest entry.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.57",
  "found": "Found an issue where the Bone Knight's summoning and healing only switched on for the night boss spawn, which was interfering with knights from a spawn egg: they never called skeletons or got a healer mage.",
  "fix": "Any Bone Knight now gets his boss powers the first moment he is in the world.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.57",
  "found": "Found an issue where mobs damaged you with no movement at all, which was interfering with seeing a fight: the Bone Knight never swung his sword and most mobs just stood and hit.",
  "fix": "Mobs now wind up, swing, bite or cast with their whole body, timed to the moment the hit lands.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.57",
  "found": "Found an issue where villagers swung their limbs at running speed while creeping along, which was interfering with how walking looks.",
  "fix": "Villagers now walk like Minecraft characters at about a block a second, with legs and arms swinging in opposite pairs and heads that turn to look at you.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.57",
  "found": "Found an issue where the Chaos Elemental fired the moment it picked an attack and shrank to nothing when it died, which was interfering with how its fight reads.",
  "fix": "It now winds up in the colour of each attack, and its death is a burst of flying pieces and shards.",
  "date": "Nov 12, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.58",
  "found": "Found an issue where hillside cave mouths and ravines were open holes in the ground, which was interfering with walking: you could fall in and get stuck.",
  "fix": "They are gone from the world, in new and old saves. The deep caves are still there under solid ground.",
  "date": "Nov 13, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.58",
  "found": "Found an issue where every creature could be heard from far away, which was interfering with the quiet of the island.",
  "fix": "Creatures, villagers and buddies are now only heard within 3 blocks and fade out after that. Bosses can still be heard from far away.",
  "date": "Nov 13, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.58",
  "found": "Found an issue where the Chaos Elemental showed its distance the moment it appeared and left after only 3 minutes, which was interfering with finding it.",
  "fix": "It arrives with a message, the distance shows a few seconds later, and it stays 5 minutes before it leaves if nobody touches it.",
  "date": "Nov 13, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.58",
  "found": "Found an issue where all four buddies crowded around you in one bunch, which was interfering with exploring.",
  "fix": "Each buddy now keeps at least 25 blocks from you and about 20 blocks from the other buddies. The Settings option is just Buddies, on or off.",
  "date": "Nov 13, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.59",
  "found": "Found an issue where the Bone Knight called skeletons the moment you walked up, which was interfering with the start of the fight.",
  "fix": "He now calls them as his health falls: 4 at first blood, a healer at 60%, 4 more and 2 Mithril Skeletons at 40%, and he rages at 20%.",
  "date": "Nov 13, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.59",
  "found": "Found an issue where skeletons were solid grey bodies, which was interfering with them looking like skeletons.",
  "fix": "They are now see-through Minecraft style skeletons with a skull, spine, ribs and thin bone limbs, a little smaller than an undead.",
  "date": "Nov 13, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.61",
  "found": "Found an issue where the boat was sitting on dry land, which was interfering with sailing.",
  "fix": "The boat now waits in open water and can only sail on water.",
  "date": "Nov 14, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.61",
  "found": "Found an issue where leaving the boat sent you to a random place, which was interfering with docking.",
  "fix": "Leaving the boat now puts you on the nearest shore beside it.",
  "date": "Nov 14, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.61",
  "found": "Found an issue where big white squares appeared around you when you spawned in, which was interfering with the snow.",
  "fix": "Snow now falls as small round flakes that follow your height.",
  "date": "Nov 14, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.62",
  "found": "Found an issue where a held block leaned over in the corner of the screen, which was interfering with how it looked in your hand.",
  "fix": "A held block now shows like the inventory icon, turned 45 degrees with its edges upright.",
  "date": "Nov 14, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.62",
  "found": "Found an issue where the last block of a stack stayed in your hand after it was gone from the bar, which was interfering with an empty hand.",
  "fix": "The hand now follows the slot, so it is empty when the slot is empty.",
  "date": "Nov 14, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.62",
  "found": "Found an issue where the mouse wheel skipped empty hotbar slots, which was interfering with reaching slots 4 to 9.",
  "fix": "The wheel now goes through all nine slots.",
  "date": "Nov 14, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.77",
  "found": "Found an issue where a torch, campfire, bed, Farm Patch or Brewing Stand could not be hit to pick it up: your swing went through it and dug the ground underneath, and the R key demolished it without giving anything back.",
  "fix": "You can now hit them to pick them up and the item comes back to you (a red bed comes back as a red bed). R gives the item back too, and you can aim at a bed, campfire or Farm Patch to use it.",
  "date": "Nov 24, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.77",
  "found": "Found an issue where an open door or gate could not be closed with E unless you aimed at the thin slab at its hinge. Aiming through the doorway found nothing.",
  "fix": "Press E while looking at a door or gate right in front of you and it swings, open or shut.",
  "date": "Nov 24, 2026"
 },
 {
  "kind": "fix",
  "ver": "1.77",
  "found": "Found an issue where you could not eat food to heal when your hunger bar was full, even if your health was low.",
  "fix": "Food can be eaten whenever your health or your hunger is not full.",
  "date": "Nov 24, 2026"
 }
];
