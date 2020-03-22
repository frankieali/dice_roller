import * as dist from "../dist/index";

const testRolls: [string, string][] = [
	["d20+5", "(*1* = 1) + 5 = 6"],
	["3d6+2", "(*1*, *1*, *1* = 3) + 2 = 5"],
	["2d6+5 + d8", "(*1*, *1* = 2) + 5 + (*1* = 1) = 8"],
	["1d20+5", "(*1* = 1) + 5 = 6"],
	["1d20+5 Roll for Initiative", "(*1* = 1) + 5 = 6"],
	["1d20+5 \\ +5 Roll for Initiative", "(*1* = 1) + 5 = 6"],
	["2d20+5[Fire Damage] + 3d6+5[Ice Damage]", "(*1*, *1* = 2) + 5 (Fire Damage) + (*1*, *1*, *1* = 3) + 5 (Ice Damage) = 15"],
	["2d10+2d6[crit]+5 Critical Hit!", "(*1*, *1* = 2) + (crit: (*1*, *1* = 2)) + 5 = 9"],
	["[[2d6]]d5", "*1*, *1* = 2"],
	["5+3", "5 + 3 = 8"],
	["3d6!", "*1*, *1*, *1* = 3"],
	["3d6!>4", "*1*, *1*, *1* = 3"],
	["3d6!3", "*1*, *1*, *1* = 3"],
	["10d6!", "*1*, *1*, *1*, *1*, *1*, *1*, *1*, *1*, *1*, *1* = 10"],
	["5d6!!", "*1*, *1*, *1*, *1*, *1* = 5"],
	["{5d6!!}>8", "{ 1, 1, 1, 1, 1 = 0 } = 0"],
	["5d6!p", "*1*, *1*, *1*, *1*, *1* = 5"],
	["5d6!p", "*1*, *1*, *1*, *1*, *1* = 5"],
	["8d100k4", "~~1~~, ~~1~~, ~~1~~, ~~1~~, *1*, *1*, *1*, *1* = 4"],
	["8d100d3", "~~1~~, ~~1~~, ~~1~~, *1*, *1*, *1*, *1*, *1* = 5"],
	["8d100dh3", "~~1~~, ~~1~~, ~~1~~, *1*, *1*, *1*, *1*, *1* = 5"],
	["8d100kl3", "~~1~~, ~~1~~, ~~1~~, ~~1~~, ~~1~~, *1*, *1*, *1* = 3"],
	["3d6>3", "1, 1, 1 = 0"],
	["10d6<4", "**1**, **1**, **1**, **1**, **1**, **1**, **1**, **1**, **1**, **1** = 10"],
	["3d6>3f1", "*1*, *1*, *1* = -3"],
	["3d6<3f1", "1, 1, 1 = 0"],
	["10d6<4f>5", "**1**, **1**, **1**, **1**, **1**, **1**, **1**, **1**, **1**, **1** = 10"],
	["{3d6+1}<3", "{ (**1**, **1**, **1** = 3) + 1 = 3 } = 3"],
	["2d8r8", "*1*, *1* = 2"],
	["2d8ro1r3r5r7", "~~1~~, *1*, ~~1~~, *1* = 2"],
	["2d8ro<2", "~~1~~, *1*, ~~1~~, *1* = 2"],
	["4dF", "-1, -1, -1, -1 = -4"],
	["4dF+1", "(-1, -1, -1, -1 = -4) + 1 = -3"],
	["{4d6+3d8}kh1", "{ (~~1~~, ~~1~~, ~~1~~, ~~1~~ = 4) + (~~1~~, ~~1~~, *1* = 3) = 1 } = 1"],
	["{4d6,3d8}kh1", "{ ~~(*1*, *1*, *1* = 3)~~ + (*1*, *1*, *1*, *1* = 4) } = 4"],
	["4d6kh1<4", "~~1~~, ~~1~~, ~~1~~, **1** = 1"],
	["4d6kh3>4", "~~1~~, 1, 1, 1 = 0"],
	["4d6>4kh3", "~~1~~, 1, 1, 1 = 0"],
	["4d6<4kh3", "~~1~~, **1**, **1**, **1** = 3"],
	["4d6mt", "__*1*__, __*1*__, __*1*__, __*1*__ = 1 Match"],
	["4d6mt3", "__*1*__, __*1*__, __*1*__, __*1*__ = 1 Match"],
	["4d6mt5", "*1*, *1*, *1*, *1* = 0 Matches"],
	["4d6mt3>2", "*1*, *1*, *1*, *1* = 0 Matches"],
	["4d6mt4<2", "__*1*__, __*1*__, __*1*__, __*1*__ = 1 Match"],
	["floor(7/2)", "floor(7 / 2 = 3.5) = 3"],
	["ceil(7/2)", "ceil(7 / 2 = 3.5) = 4"],
	["round(7/3)", "round(7 / 3 = 2.3333333333333335) = 2"],
	["round(8/3)", "round(8 / 3 = 2.6666666666666665) = 3"],
	["abs(7)", "abs(7) = 7"],
	["abs(-7)", "abs(-7) = 7"],
	["floor( 5 / 2d6 ) + ceil( (3d6 + 7d2) / 4 ) - 2d6", "(floor(5 / (*1*, *1* = 2) = 2.5) = 2) + (ceil(((*1*, *1*, *1* = 3) + (*1*, *1*, *1*, *1*, *1*, *1*, *1* = 7) = 10) / 4 = 2.5) = 3) - (*1*, *1* = 2) = 3"],
	["16 % 3", "16 % 3 = 1"],
	["3 ** 2", "3 ** 2 = 9"],
];

const roller = new dist.DiceRoller(() => 0);
const renderer = new dist.DiscordRollRenderer();
testRolls.forEach(([input, expectedValue]) => {
	test(input, () => {
		const roll = roller.roll(input);
		expect(renderer.render(roll)).toBe(expectedValue)
	});
});