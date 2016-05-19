Meteor.startup(() => {
    console.log('Joakenpo running');
    if(List.find().count() === 0) {
        ['John', 'Peter', 'Rachel'].map((name) => List.insert({ name: name }));
    }
    console.log(List.find().count());
});