export const validationName = (name) => {
    //valida que el nombre contenga letras y espacios en blanco, mayusculas y minisculas, tildes, dieresis y ñ.
    return /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name);
};

export const validationImage = (image) => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(image);
};

export const validationHp = (hp) => {
    return /^\d+$/.test(hp);
};

export const validationAttack = (attack) => {
    return /^\d+$/.test(attack);
};

export const validationDefense = (defense) => {
    return /^\d+$/.test(defense);
};

export const validationSpeed = (speed) => {
    return /^\d+$/.test(speed);
};

export const validationHeight = (height) => {
    return /^\d+$/.test(height);
};

export const validationWeight = (weight) => {
    return /^\d+$/.test(weight);
};
