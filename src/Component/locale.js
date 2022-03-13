import localize from "fronto-localize";

const en = {
  delete: "Delete Note",
  edit: "Edit",
  markAsComplete: "Mark as Complete",
  addNote: "Add Note"
};
const fr = {
  delete: "Supprimer la note",
  edit: "Modifier",
  markAsComplete: "Marquer comme terminé",
  addNote: "Ajouter une note"
};
const gr = {
  delete: "Knoten löschen",
  edit: "Bearbeiten",
  markAsComplete: "Als vollständig markieren",
  addNote: "Notiz hinzufügen"
};
const hi = {
  delete: "नोट हटाएँ",
  edit: "संपादित करें",
  markAsComplete: "पूर्ण के रूप में चिह्नित करें",
  addNote: "नोट जोड़े"
};

export default localize({ en, fr, gr, hi });
