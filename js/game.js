const player = {
	//Деньги игрока
	coins: 0,
	// Имеющийся урон у игрока
	playerDamage: 1,
	//Авто-урон у игрока
	playerAutoDamage: 0,
	//Волна игрока
	wave: 1,
};
const buttons = {
	// Первый - количество урона Второй - количество у игрока Третий - цена
	upgradeClick: [[1, 1, 10], [2, 0, 25], [3, 0, 50], [4, 0, 100]],
	// Первый - количество урона Второй - количество у игрока
	upgradeAuto: [[1, 0, 20], [2, 0, 50], [3, 0, 100], [4, 0, 200]],
}
const monstersList = {
	monsterHealth: 10,
	monsters: [
		['Засосник', './image/monster1.png'],
		['Каменюга', './image/monster2.png'],
		['Рофлян', './image/monster3.png'],
	]
}
monster = document.querySelector('#monster');
health = document.querySelector('#health');
coins = document.querySelector('#coins');
DamageInSecText = document.querySelector('#DamageInSec');
DamageText = document.querySelector('#mainDamage');
waveText = document.querySelector('#wave');
monsterHealthNow = monstersList.monsterHealth;
//Множитель для цены
multiplier = 1.07;
multiplierMonster = 1.0012;
multiplierAuto = 1.20;
imageCount = 1;
monster.addEventListener('click', giveDamage);
main();


function main() {
	upgradesClickCheck();
	upgradesAutoCheck();
	showInfo();
	viewCoins();
	damageInSec();
}

function damageInSec() {
	setInterval(function () {
		monsterHealthNow = monsterHealthNow - player.playerAutoDamage;
		showHp();
		if (monsterHealthNow <= 1) {
			deathMonster();
			monsterReset();
		}
	}
		, 1000)
}

function deathMonster() {
	player.coins += Math.ceil(player.wave / 10);
	if (Number.isInteger(player.wave / 10)) {
		imageCount += 1;
	}
	if (imageCount > 3) {
		imageCount = 1;
	}
	player.wave++;
	monstersList.monsterHealth = Math.ceil(monstersList.monsterHealth * (Math.pow(multiplierMonster, player.wave)));
	monsterHealthNow = monstersList.monsterHealth;
	viewCoins();
	showInfo();
	monsterReset();
}

function monsterReset() {
	health.innerHTML = monstersList.monsterHealth;
	health.style = `background: white;`;
	monster.children[0].src =`./images/monster${imageCount}.png`;	
	setTimeout(() => {
		health.style = `background: chartreuse; transition: all 0.2s ease 0s;`;
	}, 100);
}

function showHp() {
	health.innerHTML = monsterHealthNow;
	let monsterProcent = 100 * (monsterHealthNow / monstersList.monsterHealth);
	health.style = `background: linear-gradient(to right, chartreuse 0%, chartreuse ${monsterProcent}%, white 0%, white ${100 - monsterProcent + 1}%);`;
	waveText.innerHTML = player.wave;
}

function showInfo() {
	let headerButtons = document.querySelectorAll('.header__upgrade');
	for (let n = 0; n < headerButtons.length; n++) {
		for (let i = 0; i < headerButtons[n].children.length; i++) {
			if (headerButtons[n].children[i].id == 'count') {
				headerButtons[n].children[i].innerHTML = buttons.upgradeClick[n][1];
			}
			if (headerButtons[n].children[i].id == 'cost') {
				headerButtons[n].children[i].innerHTML = buttons.upgradeClick[n][2];
			}
		}
	}
	viewCoins();
	let headerButtons2 = document.querySelectorAll('.header__upgrade-sec');
	for (let n = 0; n < headerButtons2.length; n++) {
		for (let i = 0; i < headerButtons2[n].children.length; i++) {
			if (headerButtons2[n].children[i].id == 'count') {
				headerButtons2[n].children[i].innerHTML = buttons.upgradeAuto[n][1];
			}
			if (headerButtons2[n].children[i].id == 'cost') {
				headerButtons2[n].children[i].innerHTML = buttons.upgradeAuto[n][2];
			}
		}
	}
	viewCoins();
}

function giveDamage() {
	monsterHealthNow = monsterHealthNow - player.playerDamage;
	showHp();
	if (monsterHealthNow <= 0) {
		deathMonster();

	}
}

function viewCoins() {
	coins.innerHTML = player.coins + '$';
}

function upgradesClickCheck() {
	let mainDamage = 0
	for (upgrade of buttons.upgradeClick) {
		if (upgrade[1] != 0) {
			mainDamage += upgrade[0] * upgrade[1];
		}
	}
	player.playerDamage = mainDamage;
	DamageText.innerHTML = mainDamage + ' за клик';
}

function upgradesAutoCheck() {
	let mainDamage = 0
	for (upgrade of buttons.upgradeAuto) {
		if (upgrade[1] != 0) {
			mainDamage += upgrade[0] * upgrade[1];
		}
	}
	player.playerAutoDamage = mainDamage;
	DamageInSecText.innerHTML = mainDamage + ' в секунду';;
}

function buyUpgrade(button) {
	//Извлекает ID кнопки
	butId = button.id.split('_')[1];
	butClass = button.id.split('_')[0];
	console.log(butClass);

	if (player.coins >= parseInt(buttons[butClass][butId - 1][2])) {
		player.coins -= parseInt(buttons[butClass][butId - 1][2]);
		buttons[butClass][butId - 1][1] = parseInt(buttons[butClass][butId - 1][1]) + 1;
		square = multiplier;
		if (butClass == 'upgradeAuto') {
			square = Math.pow(multiplierAuto, parseInt(buttons.upgradeClick[butId - 1][1]));
		} else {
			Math.pow(multiplier, parseInt(buttons.upgradeClick[butId - 1][1]));
		}
		buttons[butClass][butId - 1][2] = Math.ceil(parseInt(buttons[butClass][butId - 1][2]) * square)
		console.log(butClass);
		if (butClass == 'upgradeClick') {
			upgradesClickCheck();
		} else {
			upgradesAutoCheck()
		}
		console.log(buttons[butClass]);
	} else {
		errorBuy(button)
	}
	showInfo();
}

function errorBuy(button) {
	button.style = 'background-color: #4F1111;'
	coins.style = 'color: #4F1111;'
	setTimeout(() => {
		button.style = 'background-color: black;'
	}, 1000);
}
