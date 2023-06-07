CREATE TABLE IF NOT EXISTS reservation_tables(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  
  reservation_id BIGINT UNSIGNED NOT NULL,
  table_id BIGINT UNSIGNED NOT NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),

  FOREIGN KEY (reservation_id) REFERENCES reservations(id),
  FOREIGN KEY (table_id) REFERENCES tables(id)
);