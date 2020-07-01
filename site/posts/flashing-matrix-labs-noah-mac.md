---
title: Flashing the Matrix Labs Noah on a Mac
date: 2020-05-02T14:46:20.723Z
keywords: Mechanical Keyboard, Matrix Labs, Noah, OS X, Mac
image: matrix.jpg
image_credit: Markus Spiske on Unsplash
layout: layouts/page
---

I finally had a chance to build my Matrix Labs Noah. It is a 65% keyboard with very clean lines. It is also one of the first Matrix Labs boards to support QMK.

Flashing the Noah is a little different than most of the other QMK powered boards I have used. Instead of using QMK toolbox or the command line, you:

1. Put the keyboard into a boot drive mode by holding ESC and plugging in the USB cable.
2. Delete a file called `FIRMWARE.bin` from the Noah Boot drive
3. Copy your custom firmware into the Noah drive (file name does not matter, needs to be a .bin file).

Full video details [here](https://www.youtube.com/watch?v=PqeIvTJ-ir0).

I had read about a couple of others who have had issues flashing the Noah and ended up with a bricked PCB. I was hoping to avoid flashing, but I went with a 7U spacebar and split backspace which, is not configured properly on the default firmware.

I used this site, [http://iatkb.com](http://iatkb.com/)[^1], to build the firmware with the eeprom fixes mentioned in the video. Then following the steps in the video, I attempted to flash the board.

Right from the start, I ran into a snag. I deleted the existing firmware, FIRMWARE.bin, and tried to copy over my custom firmware, but received a warning about the lack of disk space available on the Noah. I figured Mac had not deleted the file yet, and I needed to empty the trash. I tried again to copy over the file, and we had success.

I unplugged the Noah, said a little prayer and plugged it back in. Bamm....brick city!

I decided to see if I could again put the Noah into the boot drive mode, and thankfully that was still an option.

Next, with another keyboard, I navigated to the `Noah Boot` drive and could see there was a folder, `.fseventsd`,and my custom firmware (interestingly renamed FIRMWARE.bin).

This time, I removed each of the files at the command line:

```bash
cd /Volumes/NOAH\ BOOT
rm -rf .fseventsd
rm FIRMWARE.bin
```

Then, I copied over my custom firmware:

`cp ~/Downloads/matrix_noah_wkl.bin .`

Unplugged, and we were back in business (my Mac refuses to disconnect from the drive).

I have no way of knowing if this is a Mac problem or not, but it did work for me, so I wanted to put it out there, and hopefully, it will be useful to some others.

Also note, to do this, you will need a second keyboard. This is not an issue for most in the custom keyboard world (or if using a Mac Book, but built-in keyboard).

[^1]: This site is maintained by the developer who manages the QMK firmware for the Noah. Hopefully it gets merged into QMK.fm soon.
