## Welcome on Social Markdown's README !

![](http://i.imgur.com/hvpjjQ2.png "Screenshot")

First.. 

> _Wanna try it ?_

A demo website will be available in few days. 

You'll be able to try it and feel free to give us your feedback. **We need it !**

Create a new doc, and __Click__ on __"Edit Live"__.

_Yes it's that easy._


> _Ok, so.. What is it ?_

Social Markdown is a project allowing you live concurrent editing of your Markdown files. 
It can be either your README.md files from your Github projects, but also your Wiki, .. 

We needed a platform allowing us to edit those files with lot of collaborators. 

_So, we did it !_

> _How did you do this magic ?_

Well, this website is full of new cool (and less new) stuffs :

- Bootstrap (quite old now, okay..) 
- Node.js (Mmh.. okay)
- Ace editor (Oh. nice)
- And to allow you to edit your files : **Together.js** !

Together.js allows you to edit your page with your friends. 
Those guys did some really great job and at the moment, the script is dynamically loaded from their servers. 

If you want more information about the technology behind, here is their (awesome) documentation :

[Together.js Documentation](https://togetherjs.com/docs/)


> Great, but.. I want to run the project on my machine !

This is really easy, follow the steps : 

- Install mongodb 

On Ubuntu (depending on your OS) : 

``` sudo aptitude install mongodb```

- Clone the project and go in the project's folder 

``` git clone git@github.com:PaulSec/Social-Markdown.git```
And ``` cd Social-Markdown```

- Install all the dependencies 

(Guessing you already have [_node_](http://nodejs.org/) and [_npm_](http://nodejs.org/) on your machine)

``` npm install```

Then, if you didn't have any critic/cosmic/extraordinary error, you can launch the project !

```node app``` or ``` node app.js``` _(it's the same)_

### License 

This project has been released under MIT License. 

Feel free to fork it, ask/add new features.
This has been developed by [Marien](https://github.com/marienfressinaud) and I [Paul](https://github.com/PaulSec)

Cheers !
