(function(doc, win){
  'use strict';

  let candidates = [
    { 
      id: 1,
      name: 'João',
      lastName: 'Batista',
      email: 'jbatista@gmail.com',
      salaryExpectation: 2200,
      skills: [ 'JavaScript', 'CSS', 'HTML', 'Linux' ]
    },
    { 
      id: 2,
      nome: 'Maria',
      sobrenome: 'Silva',
      email: 'msilva@gmail.com',
      salaryExpectation: 3500,
      skills: [ 'Java', 'Gestão', 'PHP', 'Linux' ]
    },
    { 
      id: 3,
      nome: 'Ana',
      sobrenome: 'Beatriz',
      email: 'abeatriz@gmail.com',
      salaryExpectation: 1000,
      skills: [ 'HTML' ]
    },
    { 
      id: 4,
      nome: 'Matheus',
      sobrenome: 'Sousa',
      email: 'msousa@gmail.com',
      salaryExpectation: 1900,
      skills: [ 'HTML', 'CSS', 'Linux' ]
    }
  ];

  let idControl = candidates.length;
  let skillsList = [];

  let $inputName = doc.querySelector( '[data-js="inputName"]' );
  let $email = doc.querySelector( '[data-js="email"]' );
  let $salary = doc.querySelector( '[data-js="salary"]' );
  let $skills = doc.querySelectorAll( '[data-js="checkSkills"]' )
    .forEach(function( skill ){
      skill.addEventListener( 'click', addSkill, false );
    }
  );

  let $fieldName = doc.querySelector( '[data-js="fieldName"]' );
  let $fieldEmail = doc.querySelector( '[data-js="fieldEmail"]' );
  let $fieldSalary = doc.querySelector( '[data-js="fieldSalaryExpectation"]' );
  let $fieldSkills = doc.querySelector( '[data-js="fieldSkills"]' );

  let $modal = doc.querySelector( '[data-js="modalApplicant"]' );
    
  let $icon = doc.querySelector( '[data-js="searchIcon"]' );
  let $btn = doc.querySelector( '[data-js="searchBtn"]' ); 
  let fields = [$inputName, $email, $salary, $skills];
  
  /**Conteúdo espelhado à direita */

  function onChange( element1, element2, event ){
    element1.addEventListener( event, function(){
      element2.value = element1.value;
    }, false);
  } 

  onChange( $inputName, $fieldName, 'input' );
  onChange( $email, $fieldEmail, 'input' );
  onChange( $salary, $fieldSalary, 'input' );

  document.addEventListener('change', showBtn, false);

  function showBtn( e ){
    fields.forEach( function(field){ 
      field !== ""
      ? $btn.className = 'btn btn-primary appear' 
      : ''});
  }
  
  function addSkill( e ){
    if ( this.checked ){
      skillsList.push( this.value );
      $fieldSkills.value = skillsList.join(', ');
      console.log(skillsList)
    } else {
      let position = skillsList.indexOf(this.value);
      skillsList.splice(position, 1);
      $fieldSkills.value = skillsList.join(', ');
      console.log( skillsList, $fieldSkills.value );
    }
  }

  /**Busca candidato */

  $btn.addEventListener( 'click', searchApplicant, false );

  function searchApplicant( event, name, email, salaryExp, skills ){
    event.preventDefault();
    $modal.className = "modal collapse show";
    return console.log( 'foo' );
    //1.Pesquisar parametros 
  }

})(document, window);