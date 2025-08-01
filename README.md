
<!-- Info από stack overflow. Δεν πρόλαβα να το δοκιμάσω. Προτίμησα να ανεβάσω την εργασία πριν φύγω για διακοπές,
Αν χρειαστεί περισσότερη ανάλυση θα μπορούσα να το κάνω όταν επιστρέψω.

Στο project έχω προσθέσει κάποια features που δεν είχαμε δειδαχθεί κυρίως με τη βοήθεια του chatgpt. Όμως τα έχω κατανοήσει πλήρως. Θα ήθελα να προσθέσω και άλλα όπως πληρωμή, upload φωτογραφίες για τις παραστάσεις αλλά προτίμησα να το κάνω αργότερα.

 -->


<!-- Γιά Angular: -->

ng build --configuration production


<!-- Aντιγραφή του dist του Angular σε έναν dist στο nodejs -->



<!-- Στο server.js -->
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


<!-- Deploy στο Heroku -->