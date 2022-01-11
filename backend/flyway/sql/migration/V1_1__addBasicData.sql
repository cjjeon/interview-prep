-- Adding Top 100 Software Companies
insert into "company" (id, name)
values (1, 'Google'),
       (2, 'Facebook'),
       (3, 'Netflix'),
       (4, 'Amazon'),
       (5, 'Microsoft'),
       (6, 'Adobe'),
       (7, 'Dropbox'),
       (8, 'IFS'),
       (9, 'Guidewire'),
       (10, 'Cornerstone'),
       (11, 'Secureworks'),
       (12, 'Vertafore'),
       (13, 'Procore'),
       (14, 'Asana'),
       (15, 'iCIMS'),
       (16, 'Autodesk'),
       (17, 'Intuit'),
       (18, 'Altimetrik'),
       (19, 'Workday'),
       (20, 'Salesforce'),
       (21, 'The Trade Desk'),
       (22, 'Qualtrics'),
       (23, 'BlackLine'),
       (24, 'Cisco Systems'),
       (25, 'Nintex'),
       (26, 'PowerSchool'),
       (27, 'Twilio'),
       (28, 'Gainsight'),
       (29, 'Zoho'),
       (30, 'Atlassian'),
       (31, 'VMware'),
       (32, 'Shopify');

select setval(pg_get_serial_sequence('company', 'id'), (select max(id) from company));

insert into "role" (id, name)
values (1, 'Front-End Engineer'),
       (2, 'Back-End Engineer'),
       (3, 'Full Stack Engineer'),
       (4, 'Data Scientist'),
       (5, 'Software Engineer in Test (QA Engineer)'),
       (6, 'DevOps Engineer'),
       (7, 'Security Engineer');

select setval(pg_get_serial_sequence('role', 'id'), (select max(id) from role));

insert into "skill" (id, name)
values (1, 'Python'),
       (2, 'Go'),
       (3, 'React'),
       (4, 'HTML'),
       (5, 'CSS'),
       (6, 'JavaScript'),
       (7, 'Java'),
       (8, 'Swift'),
       (9, 'C'),
       (10, 'C++'),
       (11, 'Problem-solving'),
       (12, 'Communication');

select setval(pg_get_serial_sequence('skill', 'id'), (select max(id) from skill));


insert into "interview_question" (id, type, question, tip)
values (1, 'BEHAVIOURAL', 'Tell me about a time when you handled a challenging situation.',
        'The interviewer wants to see how you handle challenging situations when they arise. A great example is one where you successfully problem-solved to overcome the challenge. It could also be an example of a time you made mistakes in handling the challenge but learned from the experience and know what you would do differently next time.'),
       (2, 'BEHAVIOURAL',
        'Give me an example of a time you faced a conflict while working on a team. How did you handle that?',
        'The interviewer wants to see, with this question, how you handle conflicts in the workplace and what your conflict resolution strategy is. A great answer is one where you demonstrate a specific strategy that you used to resolve a problem and find a mutually agreeable resolution.'),
       (3, 'BEHAVIOURAL',
        'Tell me about a time you were under a lot of pressure. What was going on, and how did you get through it?',
        'The interviewer is using this question to see how well you work under pressure and what strategies you have used in the past to handle the pressure. This question is especially important if you are interviewing for a high-stress job. A great answer will give a specific example of how you managed a high-pressure situation successfully. It could also include what you would have done differently, looking back.'),
       (4, 'TECHNICAL', 'What tech stacks are you familiar with?',
        'The interviewer are interested about your understanding and proficiency with programming languages. Provide your answers with the languages you are familiar with and related them with work and projects. Also, if you know the tech stack that the company is looking for, it is good idea to emphasize that you are familiar with the tech stack.'),
       (5, 'TECHNICAL', 'How do you deal with bugs while programming?',
        'Troubleshooting is an essential part of software development, which is why you should already have a clear method of dealing with bugs. This is the chance to tell the recruiter about your favourite tools to debug your programs or applications. Put emphasis on the fact that great code is important to you and that you always debug extensively.');

select setval(pg_get_serial_sequence('interview_question', 'id'), (select max(id) from interview_question));