const app = {
    stepNumber: 1,
  
    /**
     * Méthode d'initialisation de notre module
     */
    init: function() {
      console.log('init');
  
      // on veut ecouter le click sur chaque bouton qui a la clase form-group__validate--step
      const bouttonsArray = document.querySelectorAll('.form-group__validate--step');
  
      // pour chaque boutton
      for(button of bouttonsArray) {
        // on créé un ecouteur qui va apeler handleClick
        button.addEventListener('click', app.handleClick);
      }
  
      const form = document.getElementById('signup-form');
      form.addEventListener('submit', app.handleSubmit);
  
    },
  
    /**
     * appelé au click d'un bouton etape suivante
     * @param {event} evt
     * rappel : evt est une variable qui contient tout le recap de l'evenement déclancheur de l'appel du handler
     */
    handleClick: function(evt) {
  
      console.log(evt);
  
      // on recupere le fieldset courant pour le passer à utils checkfieldset qui va nous dire si c'est ok pas 
      const currentSection = document.querySelector(`section[data-step='${app.stepNumber}']`);
      const currentFieldset = currentSection.querySelector('fieldset')
  
      // avant de passer à l'étape suivante je veux verifier les données de la section courante
      if (utils.checkFieldset(currentFieldset)) {
        // si les données sont ok je passe à l'étape suivante en appelant la methode showNextSection
        app.showNextSection();
      }
      else {
        // si elles sont pas bonnes j'affiche les erreurs
        console.log('il y a des erreurs');
      }
  
      
  
  
      
    },
    showNextSection : function() {
      // on veux trouver le section en cours
  
      // ---methode 1 : la section qui contient le bouton sur lequel on a cliqué 
      // on connait ce bouton car il est dans event
      /*const clickedButton = evt.currentTarget;
      const currentSection = clickedButton.closest('section');*/
  
      // ---methode 2 : on peut se dire que la section en cours est celle 
      // qui contient dans son id ou datset le numéro de l'étape
      // on part du principe que la premiere c'est 1 
      // const currentSection = document.getElementById('wizard-step'+ app.stepNumber);
      
      // on veut recuperer l'element qui a la dataset "step" égale à l'etape en cours
      //const currentSection = document.querySelector("section[data-step='" + app.stepNumber + "']");
      const currentSection = document.querySelector(`section[data-step='${app.stepNumber}']`);
  
      // ---methode 3 : la section courante est celle qui a la classe --active
      /*const currentSection = document.querySelector('.signup__step--active'); */
  
  
      // on cache la section courante en enlevant la class signup__step--active
      currentSection.classList.remove('signup__step--active');
  
      app.stepNumber ++; 
      // mettre une condition quand est à l'étape 3 pour aller chercher le recap
      let nextSection;
      if(app.stepNumber > 3) {
        // si on est à l'tape 3 la section suivante est le recap
        nextSection = document.getElementById('recap');
      }
      else {
        // on passe à l'étape suivante car il reste encore des etapes avant le recap
        nextSection = document.querySelector(`section[data-step='${app.stepNumber}']`);
        // const nextSection = currentSection.nextSibling; // attention le premier retour est un #text donc a faire 2 fois
      }
  
      // afficher next section en lui ajoutant la class signup__step--active
      nextSection.classList.add('signup__step--active');
    },
  
    handleSubmit : function(e) {
      const conf = confirm("voulez vous valider les données ?");
      console.log(conf);
      if (!conf) {
        console.log('formulaire non confirmé');
        e.preventDefault();
      }
      else {
        console.log('on peut envoyer le form !!');
      }
      
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);
  