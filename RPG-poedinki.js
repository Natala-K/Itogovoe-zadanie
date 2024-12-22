class Weapon {
    constructor(name, durability, range) {
        this.name = name;
        this.durability = durability;
        this.range = range;
    }

    takeDamage(amount) {
        this.durability -= amount;
    }

    isBroken() {
        return this.durability <= 0;
    }
}

class Player {
    constructor(position, name, speed, luck, agility) {
        this.position = position;
        this.name = name;
        this.speed = speed;
        this.luck = luck;
        this.agility = agility;
        this.life = 100; // Начальное здоровье
        this.weapon = new Weapon("Sword", 100, 2); // Начальное оружие
    }

    moveLeft(distance) {
        this.position = Math.max(0, this.position - Math.min(this.speed, distance));
        console.log(`${this.name} moved left to ${this.position}`);
    }

    moveRight(distance) {
        this.position += Math.min(this.speed, distance);
        console.log(`${this.name} moved right to ${this.position}`);
    }

    move(distance) {
        if (distance < 0) {
            this.moveLeft(-distance);
        } else {
            this.moveRight(distance);
        }
    }

    getLuck() {
        return Math.random() * 100;
    }

    isAttackBlocked() {
        return this.getLuck() > (100 - this.luck) / 100;
    }

    dodged() {
        return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
    }

    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            console.log(`${this.name} blocked the attack!`);
            this.weapon.takeDamage(damage);
            return;
        }

        if (this.dodged()) {
            console.log(`${this.name} dodged the attack!`);
            return;
        }

        this.life -= damage;
        console.log(`${this.name} took ${damage} damage! Life left: ${this.life}`);
    }

    checkWeapon() {
        if (this.weapon.isBroken()) {
            console.log(`${this.name}'s weapon is broken!`);
            this.weapon = new Weapon("Knife", 100, 1); // Переход на нож
        }
    }

    getDamage() {
        return 10; // Базовый урон
    }

    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position);
        if (this.weapon.range < distance) {
            console.log(`${this.name} is too far to attack ${enemy.name}!`);
            return;
        }

        this.weapon.takeDamage(10 * this.getLuck() / 100); // Урон оружию
        enemy.takeAttack(this.getDamage());

        if (this.position === enemy.position) {
            console.log(`${enemy.name} is knocked back!`);
            enemy.position += 1; // Отскакивает на 1 позицию
            enemy.takeAttack(this.getDamage()); // Удвоенный урон
        }

        this.checkWeapon();
    }

    chooseEnemy(players) {
        return players.reduce((prev, curr) => (curr.life < prev.life ? curr : prev), this);
    }

    moveToEnemy(enemy) {
        if (this.position < enemy.position) {
            this.moveRight(enemy.position - this.position);
        } else {
            this.moveLeft(this.position - enemy.position);
        }
    }

    turn(players) {
        const enemy = this.chooseEnemy(players);
        this.moveToEnemy(enemy);
        this.tryAttack(enemy);
    }
}

class Warrior extends Player {
    constructor(position, name) {
        super(position, name, 2, 50, 20); // speed, luck, agility
    }
}

class Archer extends Player {
    constructor(position, name) {
        super(position, name, 3, 40, 30); // speed, luck, agility
        this.weapon = new Weapon("Bow", 100, 5); // Начальное оружие
    }

    getDamage() {
        return 8; // Базовый урон для стрелка
    }
}

function play(players) {
    while (players.filter(player => player.life > 0).length > 1) {
        players.forEach(player => {
            if (player.life > 0) {
                player.turn(players);
            }
        });
    }

    const winner = players.find(player => player.life > 0);
    console.log(`${winner.name} is the winner with ${winner.life} life left!`);
}

// Пример использования
let players = [
    new Warrior(0, "Алёша Попович"),
    new Archer(2, "Леголас"),
    new Warrior(4, "Илья Муромец"),
];

play(players);
