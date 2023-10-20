INSERT INTO "Plants" ("Name", "About", "Water_tips", "Photo", "CreateAt")
VALUES
    ('Aningapara', 'É uma espécie tropical que tem crescimento rápido e fácil manuseio.', 'Mantenha a terra sempre úmida sem encharcar. Regue 2 vezes na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/1.svg', NOW()),
    ('Zamioculca', 'Apesar de florescer na primavera, fica o ano todo bonita e verdinha.', 'Utilize vasos com furos e pedras no fundo para facilitar a drenagem. Regue 1 vez no dia.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/2.svg', NOW()),
    ('Peperomia', 'Adapta-se tanto ao sol e sombra, mas prefere ficar num cantinho fresco, sem sol direto.', 'Nos dias mais quentes borrife água nas folhas. Regue 3 vezes na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/3.svg', NOW()),
    ('Imbé', 'De médio porte que se adapta a diversas regiões, além de ser bem fácil de cultivar. Conquista cada vez mais pessoas.', 'Mantenha a terra sempre úmida sem encharcar. Regue 2 vezes na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/4.svg', NOW()),
    ('Espada São Jorge', 'O aroma reduz os níveis de ansiedade e seu cheiro ajuda na qualidade do sono e a produtividade durante o dia.', 'Regue o solo ao redor. Regue 1 vez no dia.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/5.svg', NOW()),
    ('Yucca', 'São indicadas pois são fáceis de manter e cuidar. Você pode colocar em pequenos vasos, ou até mesmo em xícaras.', 'Graças à reserva de água dessas verdinhas, é sempre melhor regar pouco. Regue 1 vez na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/6.svg', NOW()),
    ('Frutíferas', 'Exigem algumas horinhas de sol por dia, por isso deixe próximo a janelas.', 'Regue sempre na terra e não nas folhas. Regue 3 vezes na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/7.svg', NOW()),
    ('Orquídea', 'Traz sensação de tranquilidade e paz ao ambiente. Requer pouca manutenção e ótima para quem tem pouco espaço.', 'Regue moderadamente. Reque 4 vezes na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/8.svg', NOW()),
    ('Violeta', 'Com flores delicadas. Elas são ótimas sugestões para decorar o banheiro.', 'Nada de molhar as flores e folhas. Regue o solo 2 vezes na semana.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/3.svg', NOW()),
    ('Hortênsia', 'A hortênsia é uma planta rústica e se adapta a diferentes tipos de solos.', 'Mantenha a terra sempre úmida sem encharcar. Regue 1 vez no dia.', 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/2.svg', NOW());

INSERT INTO "Environments" ("Key", "Title", "CreateAt")
VALUES
    ('living_room', 'Sala', NOW()),
    ('kitchen', 'Cozinha', NOW()),
    ('bedroom', 'Quarto', NOW()),
    ('bathroom', 'Banheiro', NOW());

INSERT INTO "Frequencys" ("Title", "CreateAt")
VALUES
    ('day', NOW()),
    ('week', NOW());

INSERT INTO "PlantsFrequencys" ("PlantId", "FrequencyId", "Times", "CreateAt")
VALUES
    (1, 2, 2, NOW()),
    (2, 1, 1, NOW()),
    (3, 2, 3, NOW()),
    (4, 2, 2, NOW()),
    (5, 1, 1, NOW()),
    (6, 2, 1, NOW()),
    (7, 2, 3, NOW()),
    (8, 2, 4, NOW()),
    (9, 2, 2, NOW()),
    (10, 1, 1, NOW());

INSERT INTO "PlantsEnvironments" ("PlantId", "EnvironmentId", "CreateAt")
VALUES
    (1, 1, NOW()),
    (1, 3, NOW()),
    (2, 1, NOW()),
    (2, 2, NOW()),
    (3, 2, NOW()),
    (4, 2, NOW()),
    (4, 1, NOW()),
    (5, 2, NOW()),
    (5, 1, NOW()),
    (6, 3, NOW()),
    (6, 2, NOW()),
    (7, 3, NOW()),
    (7, 1, NOW()),
    (8, 4, NOW()),
    (9, 4, NOW()),
    (10, 4, NOW());
