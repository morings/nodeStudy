<div id="page-doc" markdown="1">
<h1 id="routing"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由</font></font></h1>

<p><em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由</font></font></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">是指应用程序的端点（URI）如何响应客户端请求。</font><font style="vertical-align: inherit;">有关路由的介绍，请参见</font></font><a href="https://www.expressjs.com.cn/en/starter/basic-routing.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">基本路由</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您可以使用Express </font></font><code>app</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">对象的与HTTP方法相对应的</font><font style="vertical-align: inherit;">方法来定义路由</font><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">例如，</font></font><code>app.get()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">处理GET请求和</font></font><code>app.post</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">POST请求。</font><font style="vertical-align: inherit;">有关完整列表，请参见</font></font><a href="https://www.expressjs.com.cn/en/4x/api.html#app.METHOD"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">app.METHOD</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">您还可以使用</font></font><a href="https://www.expressjs.com.cn/en/4x/api.html#app.all"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">app.all（）</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">处理所有HTTP方法，并使用</font></font><a href="https://www.expressjs.com.cn/en/4x/api.html#app.use"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">app.use（）</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">将中间件指定为回调函数（有关</font><font style="vertical-align: inherit;">详细信息，</font><font style="vertical-align: inherit;">请参见</font></font><a href="https://www.expressjs.com.cn/en/guide/using-middleware.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">使用中间件</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">这些路由方法指定在应用程序收到对指定路由（端点）和HTTP方法的请求时调用的回调函数（有时称为“处理函数”）。</font><font style="vertical-align: inherit;">换句话说，应用程序“侦听”与指定的路由和方法匹配的请求，并且当它检测到匹配项时，它将调用指定的回调函数。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">实际上，路由方法可以具有多个回调函数作为参数。</font><font style="vertical-align: inherit;">对于多个回调函数，重要的是提供</font></font><code>next</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">回调函数的参数，然后</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在函数体内</font><font style="vertical-align: inherit;">调用</font><font style="vertical-align: inherit;">以将控制权移交给下一个回调。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">以下代码是一个非常基本的路由示例。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express<span class="token punctuation">(</span></span><span class="token punctuation">)</span><font></font>
<font></font>
<span class="token comment" spellcheck="true">// respond with "hello world" when a GET request is made to the homepage
</span>app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<h2 id="route-methods"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路线方法</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由方法是从HTTP方法之一派生的，并附加到</font></font><code>express</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">该类</font><font style="vertical-align: inherit;">的实例</font><font style="vertical-align: inherit;">。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">以下代码是为GET和POST方法定义的到应用根目录的路由的示例。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token comment" spellcheck="true">// GET method route
</span>app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'GET request to the homepage'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><font></font>
<font></font>
<span class="token comment" spellcheck="true">// POST method route
</span>app<span class="token punctuation">.</span><span class="token function">post<span class="token punctuation">(</span></span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'POST request to the homepage'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Express支持与所有HTTP请求方法相对应的方法：</font></font><code>get</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>post</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">等。</font><font style="vertical-align: inherit;">有关完整列表，请参见</font></font><a href="https://www.expressjs.com.cn/en/4x/api.html#app.METHOD"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">app.METHOD</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">有一种特殊的路由方法，</font></font><code>app.all()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">用于为</font></font><em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">所有</font></font></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> HTTP请求方法</font><font style="vertical-align: inherit;">的路径加载中间件功能</font><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">例如，无论是使用GET，POST，PUT，DELETE还是</font></font><a href="https://nodejs.org/api/http.html#http_http_methods"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">http模块</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">支持的任何其他HTTP请求方法，都会对路由“ / secret”的请求执行以下处理程序</font><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">all<span class="token punctuation">(</span></span><span class="token string">'/secret'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'Accessing the secret section ...'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// pass control to the next handler
</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<h2 id="route-paths"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路线路径</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由路径与请求方法结合，定义了可以进行请求的端点。</font><font style="vertical-align: inherit;">路由路径可以是字符串，字符串模式或正则表达式。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">字符</font></font><code>?</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>+</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>*</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，和</font></font><code>()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">是他们的正则表达式的对应的子集。</font><font style="vertical-align: inherit;">连字符（</font></font><code>-</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）和点（</font></font><code>.</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）由基于字符串的路径按字面意义进行解释。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如果您需要</font></font><code>$</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在路径字符串中</font><font style="vertical-align: inherit;">使用美元字符（</font><font style="vertical-align: inherit;">），请将其转义</font></font><code>([</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">并</font><font style="vertical-align: inherit;">括在</font><font style="vertical-align: inherit;">和中</font></font><code>])</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">例如，“ </font></font><code>/data/$book</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">” </font><font style="vertical-align: inherit;">处用于请求的路径字符串</font><font style="vertical-align: inherit;">将为“ </font></font><code>/data/([\$])book</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">”。</font></font></p>

<div class="doc-box doc-info">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Express使用</font></font><a href="https://www.npmjs.com/package/path-to-regexp"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">path-to-regexp</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">来匹配路由路径；</font><font style="vertical-align: inherit;">有关定义路由路径的所有可能性，请参阅路径到正则表达式文档。</font></font><a href="http://forbeslindesay.github.io/express-route-tester/"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Express Route Tester</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">虽然不支持模式匹配，但却是用于测试基本Express路由的便捷工具。</font></font></p>
</div>

<div class="doc-box doc-warn">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">查询字符串不是路由路径的一部分。</font></font></p>
</div>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">以下是一些基于字符串的路由路径示例。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">此路由路径会将请求匹配到根路由</font></font><code>/</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'root'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">此路由路径会将请求与匹配</font></font><code>/about</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/about'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'about'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">此路由路径会将请求与匹配</font></font><code>/random.text</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/random.text'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'random.text'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">以下是一些基于字符串模式的路由路径示例。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">此路由路径将与</font></font><code>acd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">和相</font><font style="vertical-align: inherit;">匹配</font></font><code>abcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/ab?cd'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'ab?cd'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">这条路线的路径将会匹配</font></font><code>abcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>abbcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>abbbcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，等等。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/ab+cd'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'ab+cd'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">这条路线的路径将会匹配</font></font><code>abcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>abxcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>abRANDOMcd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>ab123cd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，等。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/ab*cd'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'ab*cd'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">此路由路径将与</font></font><code>/abe</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">和相</font><font style="vertical-align: inherit;">匹配</font></font><code>/abcde</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/ab(cd)?e'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'ab(cd)?e'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">基于正则表达式的路由路径示例：</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">此路由路径将匹配其中带有“ a”的任何内容。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token regex">/a/</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'/a/'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">这条路线的路径将匹配</font></font><code>butterfly</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">和</font></font><code>dragonfly</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，但不</font></font><code>butterflyman</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code>dragonflyman</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">等。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token regex">/.*fly$/</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'/.*fly$/'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<h3 id="route-parameters"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路线参数</font></font></h3>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由参数被命名为URL段，用于捕获URL中在其位置处指定的值。</font><font style="vertical-align: inherit;">捕获的值将填充到</font></font><code>req.params</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">对象中，并将在路径中指定的route参数的名称作为其各自的键。</font></font></p>

<pre><code>Route path: /users/:userId/books/:bookId<font></font>
Request URL: http://localhost:3000/users/34/books/8989<font></font>
req.params: { "userId": "34", "bookId": "8989" }<font></font>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">要使用路由参数定义路由，只需在路由路径中指定路由参数，如下所示。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/users/:userId/books/:bookId'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span>req<span class="token punctuation">.</span>params<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<div class="doc-box doc-notice">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路径参数的名称必须由“单词字符”（[A-Za-z0-9_]）组成。</font></font></p>
</div>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">由于连字符（</font></font><code>-</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）和点（</font></font><code>.</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）是按字面解释的，因此可以将它们与路由参数一起使用，以实现有用的目的。</font></font></p>

<pre><code>Route path: /flights/:from-:to<font></font>
Request URL: http://localhost:3000/flights/LAX-SFO<font></font>
req.params: { "from": "LAX", "to": "SFO" }<font></font>
</code></pre>

<pre><code>Route path: /plantae/:genus.:species<font></font>
Request URL: http://localhost:3000/plantae/Prunus.persica<font></font>
req.params: { "genus": "Prunus", "species": "persica" }<font></font>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">要更好地控制可以由route参数匹配的确切字符串，可以在括号（</font></font><code>()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font><font style="vertical-align: inherit;">后面附加一个正则表达式</font><font style="vertical-align: inherit;">：</font></font></p>

<pre><code>Route path: /user/:userId(\d+)<font></font>
Request URL: http://localhost:3000/user/42<font></font>
req.params: {"userId": "42"}<font></font>
</code></pre>

<div class="doc-box doc-warn">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">由于正则表达式通常是文字字符串的一部分，因此请确保</font></font><code>\</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">使用其他反斜杠对</font><font style="vertical-align: inherit;">所有</font><font style="vertical-align: inherit;">字符进行转义，例如</font></font><code>\\d+</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>
</div>

<div class="doc-box doc-warn">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在Express 4.x中，</font><a href="https://github.com/expressjs/express/issues/2495"><font style="vertical-align: inherit;">不以常规方式解释正则表达式中</font></a></font><a href="https://github.com/expressjs/express/issues/2495"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">的</font></font><code>*</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">字符</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">解决方法是使用</font></font><code>{0,}</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">代替</font></font><code>*</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">这可能会在Express 5中修复。</font></font></p>
</div>

<h2 id="route-handlers"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路线处理程序</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您可以提供行为类似于</font></font><a href="https://www.expressjs.com.cn/en/guide/using-middleware.html"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">中间件的</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">多个回调函数</font><font style="vertical-align: inherit;">来处理请求。</font><font style="vertical-align: inherit;">唯一的例外是这些回调可能会调用</font></font><code>next('route')</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">以绕过其余的路由回调。</font><font style="vertical-align: inherit;">您可以使用此机制在路由上施加先决条件，然后在没有理由继续使用当前路由的情况下将控制权传递给后续路由。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由处理程序可以采用函数，函数数组或二者组合的形式，如以下示例所示。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">单个回调函数可以处理路由。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/example/a'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Hello from A!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">多个回调函数可以处理一条路由（确保指定了</font></font><code>next</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">对象）。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/example/b'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'the response will be sent by the next function ...'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Hello from B!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">回调函数数组可以处理路由。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> cb0 <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'CB0'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><font></font>
<font></font>
<span class="token keyword">var</span> cb1 <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'CB1'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><font></font>
<font></font>
<span class="token keyword">var</span> cb2 <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Hello from C!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><font></font>
<font></font>
app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/example/c'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>cb0<span class="token punctuation">,</span> cb1<span class="token punctuation">,</span> cb2<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">独立功能和功能数组的组合可以处理路由。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> cb0 <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'CB0'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><font></font>
<font></font>
<span class="token keyword">var</span> cb1 <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'CB1'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><font></font>
<font></font>
app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/example/d'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>cb0<span class="token punctuation">,</span> cb1<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'the response will be sent by the next function ...'</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Hello from D!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<h2 id="response-methods"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">应对方法</font></font></h2>

<p><font style="vertical-align: inherit;"></font><code>res</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">下表中</font><font style="vertical-align: inherit;">响应对象（</font><font style="vertical-align: inherit;">）</font><font style="vertical-align: inherit;">上的方法</font><font style="vertical-align: inherit;">可以将响应发送到客户端，并终止请求-响应周期。</font><font style="vertical-align: inherit;">如果从路由处理程序中未调用这些方法，则客户端请求将被挂起。</font></font></p>

<table>
  <thead>
    <tr>
      <th><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">方法</font></font></th>
      <th><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">描述</font></font></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.download">res.download()</a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">提示要下载的文件。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.end"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">重发（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">结束响应过程。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.json"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.json（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">发送JSON响应。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.jsonp"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.jsonp（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">发送具有JSONP支持的JSON响应。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.redirect"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.redirect（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">重定向请求。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.render"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.render（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">渲染视图模板。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.send"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.send（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">发送各种类型的响应。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.sendFile"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.sendFile（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">将文件作为八位字节流发送。</font></font></td>
    </tr>
    <tr>
      <td><a href="https://www.expressjs.com.cn/en/4x/api.html#res.sendStatus"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">res.sendStatus（）</font></font></a></td>
      <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">设置响应状态代码，并将其字符串表示形式发送为响应正文。</font></font></td>
    </tr>
  </tbody>
</table>

<h2 id="app-route"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">app.route（）</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您可以使用来为路由路径创建可链接的路由处理程序</font></font><code>app.route()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">由于路径是在单个位置指定的，因此创建模块化路由非常有帮助，减少冗余和错别字也很有帮助。</font><font style="vertical-align: inherit;">有关路由的更多信息，请参见：</font></font><a href="https://www.expressjs.com.cn/en/4x/api.html#router"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Router（）文档</font></font></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">这是使用定义的链式路由处理程序的示例</font></font><code>app.route()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">route<span class="token punctuation">(</span></span><span class="token string">'/book'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Get a random book'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">post<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Add a book'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">put<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Update the book'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<h2 id="express-router"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">快速路由器</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">使用</font></font><code>express.Router</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">该类创建模块化的，可安装的路由处理程序。</font><font style="vertical-align: inherit;">一个</font></font><code>Router</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">实例是一个完整的中间件和路由系统; </font><font style="vertical-align: inherit;">因此，它通常被称为“迷你应用程序”。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">以下示例将路由器创建为模块，在其中加载中间件功能，定义一些路由，并将路由器模块安装在主应用程序的路径上。</font></font></p>

<p><font style="vertical-align: inherit;"></font><code>birds.js</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在app目录中</font><font style="vertical-align: inherit;">创建一个名为</font><font style="vertical-align: inherit;">以下内容</font><font style="vertical-align: inherit;">的路由器文件</font><font style="vertical-align: inherit;">：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> router <span class="token operator">=</span> express<span class="token punctuation">.</span><span class="token function">Router<span class="token punctuation">(</span></span><span class="token punctuation">)</span><font></font>
<font></font>
<span class="token comment" spellcheck="true">// middleware that is specific to this router
</span>router<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token keyword">function</span> timeLog <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log<span class="token punctuation">(</span></span><span class="token string">'Time: '</span><span class="token punctuation">,</span> Date<span class="token punctuation">.</span><span class="token function">now<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment" spellcheck="true">// define the home page route
</span>router<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Birds home page'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment" spellcheck="true">// define the about route
</span>router<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/about'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'About birds'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><font></font>
<font></font>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">然后，在应用程序中加载路由器模块：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> birds <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'./birds'</span><span class="token punctuation">)</span><font></font>
<font></font>
<span class="token comment" spellcheck="true">// ...
</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token string">'/birds'</span><span class="token punctuation">,</span> birds<span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">该应用程序现在将能够处理对</font></font><code>/birds</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">和的</font><font style="vertical-align: inherit;">请求</font></font><code>/birds/about</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，以及调用</font></font><code>timeLog</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">特定于该路线</font><font style="vertical-align: inherit;">的</font><font style="vertical-align: inherit;">中间件功能。</font></font></p>

      </div>