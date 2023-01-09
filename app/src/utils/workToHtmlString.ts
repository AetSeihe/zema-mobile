import {Resume} from '../models/Resume';
import {Vacancy} from '../models/Vacancy';
import {getNameByEmploymentType, getNameByWorkFormatType} from './getTextByEnums';

const style = `
<style>
.wrapper {
    max-width: 340px;
    margin: 0 auto;
  }
  
  .content {
    background: #f2f2f2;
    padding: 16px;
  }
  
  .card {
    background: #fff;
    margin-bottom: 14px;
    padding: 20px;
    border-radius: 5px;
  }
  
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header__logo {
    width:  60px;
    height: 60px;
    background-color: gray;
    margin-right: 10px;
  }
  
  .header__title {
    color: #087BFF;
    font-size: 37px;
    font-weight: 600;
  }
  
  .main-title {
    font-size: 24px;
    color: #087BFF;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .salary {
    color: gray;
    margin-bottom: 10px;
  }
  
  .text: {
    font-size: 14px;
    color: #071838;
  }
  
  .title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .skills-row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
  }
  .skill {
    background: #d1d1d1;
    margin: 5px 5px;
    font-size: 12px;
    border-radius: 5px;
    padding: 5px 10px;
  }

  .link {
      display: block;
      font-weight: 600;
  }
  
</style>
`;

type Props = {
  mainTitile: string;
  salary: string;
  description: string;
  city: string;
  workExpirience: string;
  workFormat: string;
  requirement?: string;
  responsibilities?: string;
};

export const workToPdfString = (data: Props) => {
  return `
        <div>
            <div>
            ${data.mainTitile}
            <div/>
            <div>
                ${data.salary}
            <div/>
            <div>
            ${data.description}
            <div/>
        <div/>
    `;
};

export const getHtmlResume = (resume: Resume) => {
  return `
    <div class="wrapper">
        <div class="content">
            <div class="header">
            <div class="header__title">Зема</div>
            </div>
            <div class="card">
            <div class="main-title">
                ${resume.title}
            </div>
            <div class="salary">50000 руб.</div>
            <div class="text">
               ${resume.description}
            </div>
            </div>
            <div class="card">
            <div class="title">Москва</div>
            <div class="text">
                <span class="bold">Опыт работы:</span> ${resume.workExperience}
            </div>
            <div class="text">
                <span class="bold">Занятость:</span> ${getNameByEmploymentType(resume.employment)}
            </div>
            <div class="text">
                <span class="bold">Формат работы:</span> ${getNameByWorkFormatType(resume.workFormat)}
            </div>
            </div>
            ${resume.resumeSkills.length !== 0 ? `
                <div class="card">
                <div class="title">Навыки</div>
                <div class="skills-row">
                    ${resume.resumeSkills.map((skill) => ` <div class="skill">${skill.title}</div>`).join('')}
                </div>
                </div>
            `: ''}
 
        </div>
    </div>
    ${style}
    `;
};


export const getVacancyHTML = (data: Vacancy) => {
  return `
    <div class="wrapper">
  <div class="content">
    <div class="header">
      <div class="header__title">Зема</div>
    </div>
    <div class="card">
      <div class="main-title">
        ${data.title}
      </div>
      <div class="salary">${data.minSalary} - ${data.maxSalary} руб.</div>
      <div class="text">
       ${data.description}
      </div>
    </div>
    <div class="card">
      <div class="title">${data.city.title}</div>
      <div class="text">
        <span class="bold">Опыт работы:</span> ${data.workExperience}
      </div>
      <div class="text">
        <span class="bold">Занятость:</span> ${getNameByEmploymentType(data.employment)}
      </div>
      <div class="text">
        <span class="bold">Формат работы:</span> ${getNameByWorkFormatType(data.workFormat)}
      </div>
    </div>

        <div class="card">
      <div class="title">
         Требования
      </div>
      <div class="text">
        ${data.requirement}
      </div>
    </div>
        <div class="card">
      <div class="title">
         Обязанности
      </div>
      <div class="text">
        ${data.responsibilities}
      </div>
    </div>
        ${data.skills.length !== 0 ? `
        <div class="card">
        <div class="title">Навыки</div>
        <div class="skills-row">
            ${data.skills.map((skill) => ` <div class="skill">${skill.title}</div>`).join('')}
        </div>
        </div>
    `: ''}
          <div class="card">
      <div class="title">
         ${data.companyName}
      </div>
      <div class="text">
       ${data.descriptionCompany}

      </div>
     <a href='${data.companyUrl}' ckass='link'>${data.companyUrl}</a>
    </div>

  </div>
</div>
${style}
    `;
};
