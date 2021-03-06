const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Write a description of the project.',
      },
      {
        type: 'input',
        name: 'install',
        message: 'Describe how to install your project.',
      },
      {
        type: 'input',
        name: 'purpose',
        message: 'Describe what the project is used for.',
      },
      {
        type: 'list',
        name: 'license',
        message: 'What is the appropriate license for this project?',
        choices: ["Apache", "Academic", "GNU", "ISC", "MIT", "Mozilla", "Open"]
      },
      {
        type: 'input',
        name: 'developers',
        message: 'List the people who contributed to this project:',
      },
      {
          type: 'input',
          name: 'testing',
          message: 'What are the testing instructions?',
      },
      {
          type: 'input',
          name: 'profile',
          message: 'Enter the URL for your GitHub profile.'
      },
      {
       type: 'input',
       name: 'email',
       message: 'Enter your email address.' 
      }
    ]);
  };

  const generateReadMe = (answers) =>
  `# ${answers.title}
  ![Project license](https://img.shields.io/badge/license-${answers.license}-brightgreen) 
  \n
  ## Project Description
  ${answers.description}
  \n
  ## Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Contributions](#Contributions)
  * [Test](#Test)
  * [Questions](#Questions)
  * [Licence](#Licence)
  \n
  ## Installation\n${answers.install}
  \n
  ## Purpose\n${answers.purpose}
  \n
  ## Contributions\n${answers.developers}
  \n
  ## Test\n${answers.testing}
  \n
  ## Contact for Questions:
  ##### GitHub UserName: ${answers.profile} \n
  ##### Email: ${answers.email}
  \n`;

  const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('README.md', generateReadMe(answers)))
      .then(() => console.log('Success! ReadMe Generated!'))
      .catch((err) => console.error(err));
  };
  
  init();