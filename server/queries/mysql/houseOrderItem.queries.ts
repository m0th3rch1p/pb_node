export default {
    insert:
    `INSERT INTO house_order_items (
        house_order_id,
        menu_item_id,
        quantity,
        price
    ) VALUES ?`,
    selectAllByHouseOrderId:
    `SELECT 
        hoi.quantity, 
        hoi.price,
        mi.name
    FROM house_order_items hoi
    INNER JOIN menu_items mi ON mi.id = hoi.menu_item_id
    WHERE hoi.id=?`
};