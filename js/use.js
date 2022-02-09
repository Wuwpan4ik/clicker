function use_main() {
	let header__upgrades = document.querySelector('.header__upgrades');
	let header__upgrades1 = document.querySelector('.header__upgrades-sec');
	header__upgrades.classList.add('deactive');
	header__upgrades1.classList.add('deactive');
}
function use_upgrade() {
	let header__upgrades = document.querySelector('.header__upgrades');
	let header__upgrades1 = document.querySelector('.header__upgrades-sec');
	header__upgrades.classList.remove('deactive');
	header__upgrades1.classList.add('deactive');
}
function use_upgrade_in_sec() {
	let header__upgrades = document.querySelector('.header__upgrades');
	header__upgrades.classList.add('deactive');
	let header__upgrades1 = document.querySelector('.header__upgrades-sec');
	header__upgrades1.classList.remove('deactive');
}
function use_header() {
	let header = document.querySelector('.header');
	header.classList.toggle('deactive');
}