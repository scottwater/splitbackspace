---
title: Rekt1800 - The Missing Manual
date: 2020-07-27T15:19:20.263Z
uuid: ddfc152d-eb62-4a42-911c-3e82f04c2ff9
keywords: Mechanical Keyboard, Rekt1800, manual, documentation
previewImage: /assets/images/posts/rekt1800-mm/final.jpg
layout: layouts/post
---

The [Rekt1800](https://cannonkeys.com/products/rekt1800-keyboard) is a part of CannonKeys' Brutalist line of keyboards in the 1800-Compact form factor.

Once your keyboard arrives, and you open the box, you should have the following:

1. One beautiful keyboard case
2. one PCB
3. two plates (6.25U and 7U)
4. 16+ o-rings (they look like washers)
5. 8+ black mounting screws
6. 1 Hex key
7. one sleeve for storing your keyboard when not in use

![Parts](/assets/images/posts/rekt1800-mm/parts.jpg)

As with any custom mechanical keyboard, as soon as possible, you should:

1. Check the case for any un-expected defects, scratches, etc.
2. Plugin the PCB and with a set of tweezers test each set of pads to ensure it responds appropriately. I recommend installing Via for quick testing[^test].
3. Install the rubber bumpons (feet) to the bottom of the case to ensure you do not scratch the bottom of the case during the build.

See the steps below for upgrading your PCB’s firmware to Via if it did not come pre-flashed. Flashing VIA is not required, but doing so makes configuring your board much easier and provides better testing options.

You will need to supply your switches, stabilizers, and a USB-A to USB-C cable.

## Switches and Stabilizers

To complete your build, you will need to purchase (or have on hand) switches and stabilizers. But first, we need to figure out how many of each we need.

The first choice you need to make is 6.25U or 7U spacebar.

- 6.25u uses 3 x 1.25u on the left and 2 x 1.5u on the right side of the spacebar
- 7u uses 2 x 1.5u on the left and 2 x 1.5u on the right side of the spacebar

With this choice, we have our the minimum number of switches we will need:

- 6.25u = 98x switches
- 7u = 97x switches

From there, you have two layout options which will affect the number of switches:

1. Split backspace or 2u backspace - If you choose split backspace add one switch to your final count
2. Split left plus or 2u left plus - If you decide to split the left plus you need to add one switch to your final count

For my build, I used a 7u spacebar + split backspace + 2u left plus. This means I needed 98 switches.

If this is your first custom mechanical keyboard, you will likely be more comfortable with the 6.25u spacebar (with three modifiers to the left) + 2u backspace + 2u left plus. You would need 98x[^switches] switches as well.

Now that we know our layout, we can move onto the stabilizers.

You will need a 6.25u or 7u depending on your plate choice.

From there, you need four stabilizers plus:

- One stabilizer if you use 2u backspace
- One stabilizer if you use 2u left enter

From our previous examples, for my 7u plate + split backspace, I needed five total stabilizers (1 7u and 4 x 2u). If you went with the more typical 6.25u + 2u backspace + 2u left enter, you would need six total stabilizers (1 6.25u + 5 x 2u).

## On to the build

Install the stabilizers on to your PCB, align the plate, and insert and solder your switches.

![PCB, Plate, Switches, and Stabs](/assets/images/posts/rekt1800/switch_plate.jpg)

Once complete, again, test your PCB to ensure all switches are working.

Next up, disassemble your case by removing the eight screws on the bottom of the case. You can put the bottom of the case aside for a couple of minutes.

Next, flip the top of your case over. I recommend setting it down on a deskmat to some other type of pad to ensure you do not scratch it during the next step.

Take eight o-rings and carefully align them on each of the PCB mounting holes. These are found towards the inside of your main case screw holes. You will see a slight indentation meant to help you properly align the o-rings.

![O-rings](/assets/images/posts/rekt1800-mm/o-rings.jpg)

If you have trouble aligning them, carefully use the tip of the included hex key or a small screwdriver. Be very careful not to scratch your new keyboard.

Next, carefully align your PCB on top of the 8 o-rings. You should double-check to ensure none of them moved before moving on to the next step.

Once everything is aligned, take the 8 black PCBs mounting screws and add an o-ring[^oring] to each.

![O-rings and screws](/assets/images/posts/rekt1800-mm/o-ring-screw.jpg)

From there, carefully screw the PCB to the top of the case.

Do **not** overtighten. The screws should be firm, but not overly tight. You do not want to squeeze the o-rings. If you do over tighten and one of the o-rings break, carefully remove it and try again. There should be plenty of extras.

[Before closing, see sound options below]

Finally, flip your top case over and re-mount the bottom of the case. Again, be careful not to overtighten.

## Sound Options

The Rekt1800 is a large case and has plenty of space inside it. With most switch and keycap combinations, you will sound hollow and very "pingy". There are two relatively simple things you can do to fix this:

### 1. Polyfill

Polyfill is CannonKeys' recommended option[^pf]. Polyfill is used as the filling for stuffed animals, decorative pillows, etc. It is very cheap and comes in a rather large bag. You will only need a small handful. You may want to check with Mom, grandma, or your favorite crafter before purchasing your own.

Take a small handful or so of the polyfill and spread it evenly across your case. You want enough to fill the entire cavity, but not so much that you need to force close the case (or have it squirting out the sides).

Do not worry if you have a couple of straggling pieces of polyfill sticking out. It is easy to trim that up afterward.

### 2. Foam

I like to use this [inexpensive vibration foam](https://www.amazon.com/gp/product/B000OQTV2I) from Amazon for my builds. You can cut a piece and then lay it flat in the bottom of your case.

Polyfill or foam? The choice is yours. Experiment and see what sounds better with your switch and keycap choice. Personally, I do not see a much difference between the two. So if you have one on hand, I recommend using that one.

## VIA

At the time I built my Rekt1800, VIA was not pre-flashed on my PCB. Flashing VIA on your PCB easy to do and highly recommend.

The first thing you need to do is grab the VIA bin file. You can find it in the pins of the CannonKeys discord or compile it yourself.

To put your PCB in bootloader mode, unplug it, then hold ESC while plugging it back in[^bootloader]. From there, you can use QMK toolbox to flash the new bin file onto your keyboard.

Usually, this is all you need to do to VIA enable a PCB. However, since Rekt1800 is not officially in VIA yet, you will need to go into the VIA design tab and add the Rekt1800.json layout file (also available in the CannonKeys discord server).

At this time, VIA does not remember custom the JSON file settings. So anytime you open VIA or unplug your keyboard, you will need to re-add the JSON file.

## Common Issues

### 1. Keyboard is not responding

My keyboard is not responding to keystrokes - Check to make sure it is not in the “forced” bootloader mode. There is a switch on the bottom of the PCB. It should be to the left unless you are trying to flash the PCB (note, I recommend using ESC + plugging it in or just pressing the reset button on the bottom of the PCB so that you do not accidentally forget to flip this switch back.

### 2. No (more) VIA

My keyboard stopped being recognized by VIA. - Until the Rekt1800 is officially in VIA, you will need to add that JSON configuration file every time you start VIA or unplug your keyboard.

### 3. Pingy sound

I hear pinging when I type - It is a large cavity. Remember to experiment with sound dampening techniques such as polyfill or foam.

[^test]: Windows users can also use SwitchHitter. If you prefer not to install anything, there are various websites that get the job done.
[^pf]: I believe Polyfill is included with your purchase. I did not see any in my package.
[^switches]: Switches are sold in packs of 10. The FR4 plate is very forgiving and quite easy on the switches. Still, I recommend purchasing (and lubing if you choose to do so) 110x just to be safe.
[^oring]: Adding the extra o-rings to the mounting screws is optional and may not yield any benefit. However, there are plenty included so why not take advantage of them?
[^bootloader]: If the case is open, you can also press the reset button on the bottom of the PCB.
