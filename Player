class Player {
    constructor(position, name) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
    }

    getLuck() {
        const randomNumber = Math.random() * 100;
        return (randomNumber + this.luck) / 100;
    }

    getDamage(distance) {
        const weaponDamage = this.weapon.getDamage();
        if (distance > this.weapon.range) return 0;
        return (this.attack + weaponDamage) * this.getLuck() / distance;
    }

    takeDamage(damage) {
        this.life = Math.max(0, this.life - damage);
    }

    isDead() {
        return this.life === 0;
    }
}

class Warrior extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 120;
        this.speed = 2;
        this.weapon = new Sword();
        this.description = 'Воин';
    }

    takeDamage(damage) {
        if (this.life < 60 && this.getLuck() > 0.8) {
            const magicDamage = Math.min(this.magic, damage);
            this.magic -= magicDamage;
            damage -= magicDamage;
        }
        super.takeDamage(damage);
    }
}

class Archer extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 35;
        this.description = 'Лучник';
        this.weapon = new Bow();
    }

    getDamage(distance) {
        const weaponDamage = this.weapon.getDamage();
        if (distance > this.weapon.range) return 0;
        return (this.attack + weaponDamage) * this.getLuck() * distance / this.weapon.range;
    }
}

class Mage extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 70;
        this.magic = 100;
        this.description = 'Маг';
        this.weapon = new Staff();
    }

    takeDamage(damage) {
        if (this.magic > 50) {
            damage /= 2;
            this.magic -= 12;
        }
        super.takeDamage(damage);
    }
}

// Улучшенные классы игроков

class Dwarf extends Warrior {
    constructor(position, name) {
        super(position, name);
        this.life = 130;
        this.description = 'Гном';
        this.weapon = new Axe();
    }

    takeDamage(damage) {
        if (Math.random() > 0.5) {
            damage /= 2;
        }
        super.takeDamage(damage);
    }
}

class Crossbowman extends Archer {
    constructor(position, name) {
        super(position, name);
        this.life = 85;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
    }
}

class Demiurge extends Mage {
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 120;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
    }

    getDamage(distance) {
        const weaponDamage = this.weapon.getDamage();
        if (this.magic > 0 && this.getLuck() > 0.6) {
            return (this.attack + weaponDamage) * 1.5;
        }
        return super.getDamage(distance);
    }
}
