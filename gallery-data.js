/* Then and now: early pictures from our own screenshots next to how the same things look today.
   Each group is one tab. A pair has a "then" and a "now" picture; a "now" only card is for things we have no early picture of yet. */
window.SGI_GALLERY = [
 { id: 'tools', tab: 'Weapons and tools', intro: 'We started with a flat stick for a sword and a floating tool. Now every weapon is built from many small pieces, held in a hand that matches your skin, and swings.',
   items: [
    { title: 'The first sword', text: 'A plain orange blade on a stick, from our very first builds. Today you get bronze, iron, steel and more, each with a guard, grip and blade shine.',
      then: { src: 'img/gallery/then_sword_first.jpg', when: 'September 2026', alt: 'An early bronze sword that is a flat orange bar' }, now: { src: 'img/gallery/now_sword.jpg', when: 'Now', alt: 'A steel sword held in first person with a cross guard and shaded blade' } },
    { title: 'Bare hands', text: 'The hand started as a plain block. Now the arm has a sleeve in your shirt colour and a hand in your skin colour.',
      then: { src: 'img/gallery/then_bare.jpg', when: 'October 2026', alt: 'An early first person hand with a plain sleeve' }, now: { src: 'img/gallery/now_bare.jpg', when: 'Now', alt: 'The current first person hand and sleeve' } },
    { title: 'Pickaxe', text: 'The head used to be a single curved shape. It is now a real pick with a handle, and it swings through a full arc.',
      then: { src: 'img/gallery/then_pickaxe.jpg', when: 'October 2026', alt: 'An early pickaxe in first person' }, now: { src: 'img/gallery/now_pickaxe.jpg', when: 'Now', alt: 'The current iron pickaxe in first person' } },
    { title: 'Hatchet', text: 'An early look at the hatchet head next to the pickaxe, and the iron hatchet today.',
      then: { src: 'img/gallery/then_hatchet.jpg', when: 'October 2026', alt: 'An early pickaxe and hatchet seen face on' }, now: { src: 'img/gallery/now_hatchet.jpg', when: 'Now', alt: 'The current iron hatchet' } },
    { title: 'Bow', text: 'The bow was a thin curve. Now it has wood grain, and the ends are cut logs like the Magic tree, with bark on the side and blue rings on the end.',
      then: { src: 'img/gallery/then_bow.jpg', when: 'October 2026', alt: 'An early oak bow with a smooth single colour' }, now: { src: 'img/gallery/now_bow.jpg', when: 'Now', alt: 'The current oak bow with wood grain and log ends' } },
    { title: 'Staff', text: 'Staves began as a stick with a white tip. Now each has its own head and glows in its element.',
      then: { src: 'img/gallery/then_staff.jpg', when: 'October 2026', alt: 'An early glacial staff' }, now: { src: 'img/gallery/now_staff.jpg', when: 'Now', alt: 'The current ice staff' } },
    { title: 'Torch', text: 'The torch is lit from the inside now and flickers.',
      then: { src: 'img/gallery/then_torch.jpg', when: 'October 2026', alt: 'An early torch' }, now: { src: 'img/gallery/now_torch.jpg', when: 'Now', alt: 'The current torch' } },
    { title: 'Rapier', text: 'A weapon that did not exist in our first builds at all.',
      now: { src: 'img/gallery/now_rapier.jpg', when: 'Now', alt: 'An iron rapier in first person' } }
   ],
   strip: { title: 'How the hand and pickaxe changed', text: 'Five steps in a row. We tried a blocky hand, then rounder ones, then fixed the angle and the fingers until it felt right.',
     steps: [
       { src: 'img/gallery/hand_1.jpg', cap: 'First: a blocky hand' }, { src: 'img/gallery/hand_2.jpg', cap: 'Second try' }, { src: 'img/gallery/hand_3.jpg', cap: 'Third try' },
       { src: 'img/gallery/hand_4.jpg', cap: 'Fourth try' }, { src: 'img/gallery/hand_5.jpg', cap: 'Now' } ] } },
 { id: 'mobs', tab: 'Mobs', intro: 'The first monsters were smooth, low poly shapes. Today they are painted blocky figures that carry gear, swing weapons, cast spells and call for help.',
   items: [
    { title: 'Monsters', text: 'Early on: a green goblin, a rock golem and a spider, all smooth shapes. Now: zombies, skeletons, mages, a wraith, a ghost and the Bone Knight, each with its own skin.',
      then: { src: 'img/gallery/then_mobs_night.jpg', when: 'September 2026', alt: 'A goblin, a rock golem and a spider from an early build' }, now: { src: 'img/gallery/now_mobs_night.jpg', when: 'Now', alt: 'A line of today’s monsters: undead, skeleton, mage, wraith, ghost and the Bone Knight' } },
    { title: 'Wildlife', text: 'Animals began as simple low poly bodies. Now they are built from small cubes with fur, horns, tails and legs that walk.',
      then: { src: 'img/gallery/then_mobs_wild.jpg', when: 'September 2026', alt: 'Early deer, a turtle, a crab and a golem' }, now: { src: 'img/gallery/now_mobs_wild.jpg', when: 'Now', alt: 'Today’s animals in a row: cow, sheep, deer, boar, bear, dog, cat and more' } },
    { title: 'A herd, early on', text: 'Animals came in herds from the start. They still do, and there are many more kinds now (see the picture above).',
      then: { src: 'img/gallery/then_mobs_wild2.jpg', when: 'September 2026', alt: 'A crowd of early wildlife on a beach' } },
    { title: 'Boars charging, early on', text: 'Boars were already chasing you in September. Now they also rear back before they hit.',
      then: { src: 'img/gallery/then_boar.jpg', when: 'September 2026', alt: 'An early boar charging across sand' } },
    { title: 'Bosses', text: 'The Bone Knight rises on some nights and calls up skeletons. The Chaos Elemental is a dark cloud with six tentacles that winds up before each attack. We had no bosses in the first builds.',
      now: { src: 'img/gallery/now_bosses.jpg', when: 'Now', alt: 'The Bone Knight beside the Chaos Elemental, a dark cloud with tentacles' } }
   ] },
 { id: 'npcs', tab: 'Villagers', intro: 'The people of Tidewrack and beyond. We do not have early pictures of them yet, so for now this tab shows how they look today. When we find some of the first versions we will put them here.',
   people: [
    { name: 'Bram the Smith', src: 'img/gallery/now_npc_bram.jpg' }, { name: 'Mario the Farmer', src: 'img/gallery/now_npc_tilda.jpg' }, { name: 'Pell the Fisher', src: 'img/gallery/now_npc_pell.jpg' }, { name: 'Elder Rocco', src: 'img/gallery/now_npc_wren.jpg' },
    { name: 'Eneri', src: 'img/gallery/now_npc_mara.jpg' }, { name: 'Elder Hollis', src: 'img/gallery/now_npc_hollis.jpg' }, { name: 'Wizard Miznog', src: 'img/gallery/now_npc_ilvane.jpg' }, { name: 'Papa Joe the Farmer', src: 'img/gallery/now_npc_tobin.jpg' } ] },
 { id: 'player', tab: 'Player and Bookbag', intro: 'Your character and your Bookbag have both been redrawn.',
   items: [
    { title: 'The Bookbag', text: 'The first Bookbag showed a plain blocky figure and a grid of small icons. Now you see your own character with a face and hair, a 3 by 3 crafting grid, and worn gear slots.',
      then: { src: 'img/gallery/then_bookbag.jpg', when: 'October 2026', alt: 'The early Bookbag with a plain blocky figure' }, now: { src: 'img/gallery/now_bookbag.jpg', when: 'Now', alt: 'The current Bookbag with the character, crafting grid and gear slots' } }
   ] },
 { id: 'world', tab: 'World', intro: 'The island started as smooth, low poly hills and became a world made of real blocks you can dig and build with.',
   items: [
    { title: 'The island', text: 'Smooth rolling hills from above, then the island made of blocks with snow, trees, rocks and ore you can mine.',
      then: { src: 'img/gallery/then_world.jpg', when: 'September 2026', alt: 'An early smooth low poly island seen from above' }, now: { src: 'img/gallery/now_world.jpg', when: 'Now', alt: 'The block island with a snow field, trees and the sea' } },
    { title: 'Snow, early on', text: 'The snow biome was a flat white plain. Today it is made of snowy blocks (see the picture above).',
      then: { src: 'img/gallery/then_snow.jpg', when: 'September 2026', alt: 'An early snow biome' } },
    { title: 'Desert, early on', text: 'The desert was a flat yellow floor in the early builds.',
      then: { src: 'img/gallery/then_desert.jpg', when: 'September 2026', alt: 'An early desert biome' } }
   ] }
];
