export default {
    insert: `INSERT INTO online_order_items (
        online_order_id,
        menu_item_id,
        quantity,
        price
    ) VALUES (?,?,?,?)`
};