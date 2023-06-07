DELIMITER |
CREATE TRIGGER IF NOT EXISTS set_online_order_amount AFTER INSERT ON online_order_items FOR EACH ROW
BEGIN
    DECLARE order_amount INT DEFAULT 0;
    SELECT total INTO order_amount FROM online_orders WHERE id = NEW.online_order_id;

    SET order_amount = order_amount + NEW.price;
    UPDATE online_orders SET total = order_amount WHERE id = NEW.online_order_id;
END; |
DELIMTER;

DELIMITER |
CREATE TRIGGER IF NOT EXISTS set_house_orders_amount AFTER INSERT ON house_order_items FOR EACH ROW
BEGIN
    DECLARE order_amount INT DEFAULT 0;
    SELECT total INTO order_amount FROM house_orders WHERE id = NEW.house_order_id;

    SET order_amount = order_amount + NEW.price;
    UPDATE house_orders SET total = order_amount WHERE id = NEW.house_order_id;
END; |
DELIMITER ;
