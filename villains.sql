create database villains;

-- create user 'villains'@'localhost' identified with mysql_native_password by 'Y3ns1d';

grant all on villains.* to 'villains'@'localhost';

use villains;

create table villains (
	id INT auto_increment,
    name varchar(255),
    movie varchar(255),
    slug varchar(255),
    createdAT datetime default current_timestamp,
    updatedAT datetime default current_timestamp on update current_timestamp,
    deletedAT datetime,
    primary key(id)
);

insert into villains (name, movie, slug) values ('Captain Hook', 'Peeter Pan', 'captain-hook');
insert into villains (name, movie, slug) values ('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil');
insert into villains (name, movie, slug) values ('Gaston', 'Beauty and the Beast', 'gaston');
insert into villains (name, movie, slug) values ('Hades', 'Hercules', 'hades');
insert into villains (name, movie, slug) values ('Horned King', 'The Black Cauldron', 'horned-king');
insert into villains (name, movie, slug) values ('Jafar', 'Aladdin', 'jafar');
insert into villains (name, movie, slug) values ('Lady Tremaine', 'Cinderella', 'ladye-tremaine');
insert into villains (name, movie, slug) values ('Mademe Medusa', 'The Rescuers', 'madame-medusa');
insert into villains (name, movie, slug) values ('Madam Mim', 'The Sword in th Stone', 'madam-mim');
insert into villains (name, movie, slug) values ('Maleficent', 'Sleeping Beauty', 'maleficent');
insert into villains (name, movie, slug) values ('Prince John', 'Robin Hood', 'prince-john');
insert into villains (name, movie, slug) values ('Sir Hiss', 'Robin Hood', 'sir-hiss');
insert into villains (name, movie, slug) values ('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde');
insert into villains (name, movie, slug) values ('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts');
insert into villains (name, movie, slug) values ('Scar', 'The Lion King', 'scar');
insert into villains (name, movie, slug) values ('Shan Yu', 'Mulan', 'shan-yu');
insert into villains (name, movie, slug) values ('Shere Khan', 'The Jungle Book', 'shere-khan');
insert into villains (name, movie, slug) values ('Ursula', 'The Little Mermaid', 'usrsula');