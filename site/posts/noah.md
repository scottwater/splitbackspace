---
title: Matrix Noah
date: 2020-06-10T04:04:28.263Z
uuid: 9e91b0cf-196f-44dd-96d4-82d753c2b5dd
keywords: Mechanical Keyboard, matrix noah, 65% keyboard, qmk
image: 1.jpeg
---

The Noah is my first keyboard by Matrix Lab. It has a few rough spots that make getting everything set up a bit of a challenge, but it is well worth the effort.

Build Specs:

- Noah by [Matrix Lab](https://matrix-lab.cn/)
- H1 switches, lubed with 205g0 (105 on the springs), and filmed with TX films.
- C3 Screw-in stabilizers, lubed with 205g0
- [Zambumon's](https://zambumon.com/) [MT3 Serika](https://drop.com/buy/drop-zambumon-mt3-serika-custom-keycap-set)

The Noah has not yet had an actual North America group buy. One is [supposed to happen](https://geekhack.org/index.php?topic=102300.0) and should ease the prices of these boards at least initially once it happens (and will make getting extra PCBs and different colors much easier...count me in.)

The only way to buy one today is by finding one for sale by someone in China (or by someone locally who already bought it from China). I was lucky enough to purchase a Noah a couple of months ago before the prices started to skyrocket.

I had a couple of times flirted with the idea of selling it. I did not love the black and was not sure about the 65% layout. I have since come full circle on 65%'s and feel like a dodged a bullet by not selling.

The case itself is quite nice. It is top mounted and comes with an aluminum plate. It supports a 6.25u and 7u spacebar. It is a bit lighter than your typical case but has a lot of detail put into it. Weight alone does not make a board better, so if I had to choose between interesting design and weight, I would prefer an interesting design every day.

Out of the gate, the PCB requires you to snap off some tabs. The lack of readily available replacement PCBs makes made this far more nerve-wracking than it should have been. Thankfully they snapped off quite easily (I snipped part of them with flush cutters to be safe).

![Noah PCB with Snapped Tabs](pcb_snaps.jpeg)

Once the PCB is ready, it is time to add the stabilizers. This build is my second time using C3 stabilizers. They have gotten a bad wrap in the community, but I have enjoyed them. Even better, the C3 stabilizers come with washers, which you will 100% want to use on this PCB. Matrix Labs is known for being a premium keyboard manufacturer, but there were some very questionable LED placements on this PCB[^pcbled].

![Noah PCB LED choices]( led_locations.jpeg)

Next up, the switches. I used H1 switches, which are another JWK variant (Alpaca, Mauve, Marshmallow). Of the three JWKs I have tried[^marsh] (H1, Alpaca, and Mauve) these are the best out of the bag with their 80g spring weight. My ideal spring weight is in the mid-70s, but I prefer slightly heavy to too light.
Ok, now the fun starts.

The Noah comes with a USB-C daughter board, a LED light strip, and a bunch of screws and standoffs. With no clear instructions, it is a bit of trial and error (and watching some [streams](https://www.youtube.com/watch?v=BVHEdCnBPaw)). For anyone reading this before your personal build:

1. Black Philips (cross) screws are for the LED bar.
2. There is one extra case screw
3. There is one extra plate screw
4. The rest of the screws are for connecting the daughterboard to the PCB

The daughterboard is secured via friction from the bottom plate. I am pretty sure [ApiAry](https://apiarykeyboards.com/) put a bit of solder on there to help keep in place, but from my usage, although it appears a bit flimsy, it is quite secure.

Once everything was assembled[^daughter], it was time to figure out the keycaps. I tried a couple of different sets, but for now, I settled on Zambumon's MT3 Serika. Serika is my second time trying the MT3 profile, and I am enjoying it more this time. It does take some getting used to, but overall the sound and feel are quite nice[^nubs]. And just like all of his other sets, Serika is beautiful.

The Noah case does have a large open section, which contributes to a bit of a hollow sound. I tried to correct for this by cutting a small piece 4mm cabinet liner. The change is minor but, better. The sound profile below is with the foam, but I did do a similar sound profile without the foam[^nofoam]. I do not think you can hear much a difference in the videos.

The biggest issue I have with the Noah today is the firmware.

First, [flashing the firmware](https://scottw.com/boards/flashing-matrix-labs-noah-mac/) is done by putting the board in a special flash drive mode. This flash mode has caused some issues/confusion, especially on Macs.

Second, the current firmware on QMK has some issues maintaining changes (mostly around RGB when unplugged. There is updated firmware you can grab from a third party, but this adds another dependency to your pricy board. Hopefully, this all gets merged into master soon.

Finally, there is no Via support. I am fine compiling the firmware changes on my own, but Via makes it that much easier.

Having said all of that, it is still a really nice board and one I will be keeping in the collection for a while (unless of course I can find one in something other than black[^wkl]).

[^pcbled]: RGB LEDs on a board like this is an odd choice anyway. With an aluminum case and your typical keycaps, you get almost no light. I honestly did not know it came with RGB until I examined the PCB.
[^wkl]: Re-read the IC and say there is a WKL version as well. 100% in for a WKL layout.
[^daughter]: One other interesting thing to note about the daughter board, is you can choose to have it on the left or right. This is a nice touch.
[^nofoam]: Here is the [Noah sound profile without foam](https://youtu.be/ro1cBp8PEQY).
[^nubs]: I wish it had regular homing nubs.
[^marsh]: Marshmallow's come with progressive springs, but mine are still stuck in Australia, so H1s are in the lead for now.
