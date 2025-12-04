export function randomId16UUIDStyle() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
        if ((i + 1) % 4 === 0 && i < 15) {
            id += '-';
        }
    }
    return id;
}