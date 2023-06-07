export default {
    insert: 'INSERT INTO menu_items (menu_id, name, description, image_uri, price) VALUES (?,?,?,?,?)',
    selectById: 'SELECT name, description, image_uri, price FROM menu_items WHERE id=?',
    updateById: 'UPDATE menu_items mi SET mi.menu_id=?, mi.name=?, mi.description=?, mi.price=? WHERE mi.id=?',
    updateImageUriById: `UPDATE menu_items mi SET mi.image_uri=? WHERE mi.id=?`,
    deleteById: `DELETE FROM menu_items mi WHERE mi.id=?`
};