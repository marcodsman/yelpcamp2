RESTFUL ROUTES

name       url                 verb   description
=================================================
INDEX      /campgrounds        GET    Display all campgrounds
NEW        /campgrounds/new    GET    Display form to add new campground
CREATE     /campgrounds        POST   Add a campground to the DB
SHOW       /campgrounds/:id    GET    Show more info about one campground

comments
========
NEW        /campgrounds/:id/comments/new  GET
CREATE     /campgrounds/:id/comments      POST