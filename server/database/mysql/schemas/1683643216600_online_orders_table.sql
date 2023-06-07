CREATE TABLE IF NOT EXISTS online_orders(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NOT NULL,
  customer_address_id BIGINT UNSIGNED ONT NULL,

  status ENUM ('payment_pending', 'pending', 'dispatched', 'delivered') NOT NULL DEFAULT 'payment_pending',
  total DECIMAL(10, 5) UNSIGNED NOT NULL DEFAULT 0,
  payment_method ENUM('mpesa', 'paypal') NULL,
  payment_status ENUM('paid', 'unpaid') NOT NULL DEFAULT 'unpaid',
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),

  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (customer_address_id) REFERENCES customer_addresses(id)
);