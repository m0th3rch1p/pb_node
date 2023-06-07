CREATE TABLE IF NOT EXISTS house_orders(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  table_id BIGINT UNSIGNED NOT NULL,
  employee_id BIGINT UNSIGNED NOT NULL,
  location_id BIGINT UNSIGNED NOT NULL,

  status ENUM('queue', 'pending', 'complete') NOT NULL DEFAULT 'queue',
  total DECIMAL(10, 5) UNSIGNED NOT NULL DEFAULT 0,
  payment_method ENUM('mpesa', 'paypal', 'cash') NULL,
  payment_status ENUM('paid', 'unpaid') NOT NULL DEFAULT 'unpaid',

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),

  FOREIGN KEY (table_id) REFERENCES tables(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (location_id) REFERENCES locations(id)
);