Temploo.js: Tiny framework for HTML template
==

Introduction
--
`Temploo.js` is a simple and extremly light javascript framework which takes the task of compiling templates. This is my attempts to see if I can make a template engine which satisfy my needs.

Usage
--
Just add `temploo.js` into your HTML document.

```html
    <script id="test1" type="text/template">
        <div id="<%=this.id%>">
            <% for(var i = 0; i < 10; i++) { %>
                <i id="id<%=i%>">HELLO</i>
            <% } %>
        </div>
    </script>

	<script type="text/javascript" src="js/temploo-0.0.1.js"></script>
    <script type="text/javascript">
        var templateStr = document.getElementById("test1").innerHTML;
        var test = temploo(templateStr);
        console.log(test({id: 10, i:3}));
    </script>
```

There are only 2 things to remember.

1: Use `temploo` functio nto compile your templates into `template` object.

2: Use `<%=… %>` to request for printing the value to template. as an example, `<%=this.id%>`. and use `<% .. %>` for your `javascript` statements. For example

```js
    <% for(var i=0; i < 10; i++) { %> HELLO <% } %>
```

Happy Templating. :)


License
--
Copyright (c) 2013 Ali Najafizadeh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.