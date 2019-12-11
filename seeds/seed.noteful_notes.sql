TRUNCATE noteful_notes, noteful_folders RESTART IDENTITY CASCADE;

INSERT INTO noteful_folders (folder_name)
VALUES
  ('Folder 1'),
  ('Folder 2'),
  ('Folder 3'),
  ('Folder 4'),
  ('Folder 5');

INSERT INTO noteful_notes (note_name, content, folder_id)
VALUES
  ('Note 1', '1Lorem ipsum dolor sit amet', 1),
  ('Note 2', '2Lorem ipsum dolor sit amet', 2),
  ('Note 3', '3Lorem ipsum dolor sit amet', 1),
  ('Note 4', '4Lorem ipsum dolor sit amet', 2),
  ('Note 5', '5Lorem ipsum dolor sit amet', 5),
  ('Note 6', '6Lorem ipsum dolor sit amet', 5),
  ('Note 7', '7Lorem ipsum dolor sit amet', 4),
  ('Note 8', '8Lorem ipsum dolor sit amet', 3);