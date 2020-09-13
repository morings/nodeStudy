<div id="page-doc" markdown="1">
<h1 id="error-handling"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">错误处理</font></font></h1>

<p><em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">错误处理</font></font></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">是指Express如何捕获和处理同步和异步发生的错误。</font><font style="vertical-align: inherit;">Express带有默认的错误处理程序，因此您无需自己编写即可开始使用。</font></font></p>

<h2 id="catching-errors"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">捕捉错误</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">重要的是要确保Express捕获运行路由处理程序和中间件时发生的所有错误。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">路由处理程序和中间件内部的同步代码中发生的错误不需要任何额外的工作。</font><font style="vertical-align: inherit;">如果同步代码引发错误，则Express将捕获并处理该错误。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'BROKEN'</span><span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// Express will catch this on its own.
</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">对于由路由处理程序和中间件调用的异步函数返回的错误，必须将它们传递给</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Express捕获并处理它们</font><font style="vertical-align: inherit;">的</font><font style="vertical-align: inherit;">函数。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  fs<span class="token punctuation">.</span><span class="token function">readFile<span class="token punctuation">(</span></span><span class="token string">'/file-does-not-exist'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// Pass errors to Express.
</span>    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span>data<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如果将任何内容传递给该</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">函数（字符串除外</font></font><code>'route'</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">），Express都会将当前请求视为错误，并且将跳过所有剩余的非错误处理路由和中间件函数。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如果序列中的回调不提供数据，仅提供错误，则可以按以下方式简化此代码：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">writeFile<span class="token punctuation">(</span></span><span class="token string">'/inaccessible-path'</span><span class="token punctuation">,</span> <span class="token string">'data'</span><span class="token punctuation">,</span> next<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'OK'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在上面的示例</font></font><code>next</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">中，提供了作为的回调</font></font><code>fs.writeFile</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，无论有无错误都将调用</font><font style="vertical-align: inherit;">该回调</font><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">如果没有错误，则执行第二个处理程序，否则Express捕获并处理错误。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您必须捕获由路由处理程序或中间件调用的异步代码中发生的错误，并将它们传递给Express进行处理。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'BROKEN'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">上面的示例使用一个</font></font><code>try...catch</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">块来捕获异步代码中的错误，并将它们传递给Express。</font><font style="vertical-align: inherit;">如果</font></font><code>try...catch</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
省略</font><font style="vertical-align: inherit;">了该</font><font style="vertical-align: inherit;">块，则Express将不会捕获该错误，因为它不是同步处理程序代码的一部分。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">使用promise可以避免</font></font><code>try..catch</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">块</font><font style="vertical-align: inherit;">的开销，</font><font style="vertical-align: inherit;">或者在使用返回promise的函数时。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'BROKEN'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span> <span class="token comment" spellcheck="true">// Errors will be passed to Express.
</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">由于promise会自动捕获同步错误和已拒绝的promise，因此您可以简单地提供</font></font><code>next</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">作为最终捕获处理程序，而Express将捕获错误，因为捕获处理程序将错误作为第一个参数。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您还可以使用一系列处理程序来依靠同步错误捕获，方法是将异步代码减少到微不足道的程度。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fs<span class="token punctuation">.</span><span class="token function">readFile<span class="token punctuation">(</span></span><span class="token string">'/maybe-valid-file'</span><span class="token punctuation">,</span> <span class="token string">'utf-8'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data <span class="token operator">=</span> data
      <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data <span class="token operator">=</span> res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">split<span class="token punctuation">(</span></span><span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    res<span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span>res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">上面的示例从</font></font><code>readFile</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
调用中</font><font style="vertical-align: inherit;">获得了一些简单的语句</font><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">如果</font></font><code>readFile</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">导致错误，则将错误传递给Express，否则您将快速回到链中下一个处理程序中的同步错误处理领域。</font><font style="vertical-align: inherit;">然后，上面的示例尝试处理数据。</font><font style="vertical-align: inherit;">如果失败，则同步错误处理程序将捕获该错误。</font><font style="vertical-align: inherit;">如果您已在</font></font><code>readFile</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">回调中</font><font style="vertical-align: inherit;">完成此处理，</font><font style="vertical-align: inherit;">则应用程序可能会退出并且Express错误处理程序将无法运行。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">无论使用哪种方法，如果都希望调用Express错误处理程序并使应用程序继续存在，则必须确保Express收到错误。</font></font></p>

<h2 id="the-default-error-handler"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">默认错误处理程序</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Express带有内置的错误处理程序，可处理应用程序中可能遇到的任何错误。</font><font style="vertical-align: inherit;">此默认的错误处理中间件功能已添加到中间件功能堆栈的末尾。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如果将错误传递给</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您并且没有在自定义错误处理程序中进行处理，则它将由内置错误处理程序进行处理；</font><font style="vertical-align: inherit;">错误将与堆栈跟踪一起写入客户端。</font><font style="vertical-align: inherit;">堆栈跟踪不包括在生产环境中。</font></font></p>

<div class="doc-box doc-info">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">将环境变量设置</font></font><code>NODE_ENV</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">为</font></font><code>production</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，以在生产模式下运行该应用程序。</font></font></p>
</div>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如果</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在开始编写响应后</font><font style="vertical-align: inherit;">调用</font><font style="vertical-align: inherit;">错误（例如，如果在将响应流传输到客户端时遇到错误），则Express默认错误处理程序将关闭连接并使请求失败。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">因此，当您已将标头发送到客户端时，添加自定义错误处理程序时，必须委托默认的Express错误处理程序：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">function</span> errorHandler <span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>headersSent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  res<span class="token punctuation">.</span><span class="token function">status<span class="token punctuation">(</span></span><span class="token number">500</span><span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">render<span class="token punctuation">(</span></span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> error<span class="token punctuation">:</span> err <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">请注意</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，即使使用自定义错误处理中间件，如果多次在代码中</font><font style="vertical-align: inherit;">调用</font><font style="vertical-align: inherit;">错误，</font><font style="vertical-align: inherit;">也会触发默认错误处理程序</font><font style="vertical-align: inherit;">。</font></font></p>

<h2 id="writing-error-handlers"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">编写错误处理程序</font></font></h2>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">定义错误处理中间件功能的方式与其他中间件功能相同，只是错误处理功能具有四个参数而不是三个参数
 </font></font><code>(err, req, res, next)</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error<span class="token punctuation">(</span></span>err<span class="token punctuation">.</span>stack<span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">status<span class="token punctuation">(</span></span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token string">'Something broke!'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">您最后定义错误处理中间件，之后再定义</font></font><code>app.use()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">并路由调用；</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> bodyParser <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'body-parser'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> methodOverride <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'method-override'</span><span class="token punctuation">)</span><font></font>
<font></font>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>bodyParser<span class="token punctuation">.</span><span class="token function">urlencoded<span class="token punctuation">(</span></span><span class="token punctuation">{</span>
  extended<span class="token punctuation">:</span> <span class="token keyword">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>bodyParser<span class="token punctuation">.</span><span class="token function">json<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token function">methodOverride<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment" spellcheck="true">// logic
</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">来自中间件功能的响应可以是任何格式，例如HTML错误页面，简单消息或JSON字符串。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">出于组织（和更高级别的框架）的目的，您可以定义几个错误处理中间件功能，就像使用常规中间件功能一样。</font><font style="vertical-align: inherit;">例如，为使用</font></font><code>XHR</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">和不</font><font style="vertical-align: inherit;">使用的请求定义错误处理程序</font><font style="vertical-align: inherit;">：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">var</span> bodyParser <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'body-parser'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> methodOverride <span class="token operator">=</span> <span class="token function">require<span class="token punctuation">(</span></span><span class="token string">'method-override'</span><span class="token punctuation">)</span><font></font>
<font></font>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>bodyParser<span class="token punctuation">.</span><span class="token function">urlencoded<span class="token punctuation">(</span></span><span class="token punctuation">{</span>
  extended<span class="token punctuation">:</span> <span class="token keyword">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>bodyParser<span class="token punctuation">.</span><span class="token function">json<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span><span class="token function">methodOverride<span class="token punctuation">(</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>logErrors<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>clientErrorHandler<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use<span class="token punctuation">(</span></span>errorHandler<span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在此示例中，泛型</font></font><code>logErrors</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">可能会将请求和错误信息写入</font></font><code>stderr</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">function</span> logErrors <span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error<span class="token punctuation">(</span></span>err<span class="token punctuation">.</span>stack<span class="token punctuation">)</span>
  <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">同样在此示例中，</font></font><code>clientErrorHandler</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">定义如下：</font><font style="vertical-align: inherit;">在这种情况下，错误将明确传递给下一个错误。</font></font></p>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">请注意，</font><font style="vertical-align: inherit;">在错误处理函数中</font></font><em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">不</font></font></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">调用“ next”时，您负责编写（并结束）响应。</font><font style="vertical-align: inherit;">否则，这些请求将“挂起”，并且不符合垃圾回收的条件。</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">function</span> clientErrorHandler <span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>xhr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">status<span class="token punctuation">(</span></span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">send<span class="token punctuation">(</span></span><span class="token punctuation">{</span> error<span class="token punctuation">:</span> <span class="token string">'Something failed!'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如下实现“包罗万象” </font></font><code>errorHandler</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">功能：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript"><span class="token keyword">function</span> errorHandler <span class="token punctuation">(</span>err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">status<span class="token punctuation">(</span></span><span class="token number">500</span><span class="token punctuation">)</span>
  res<span class="token punctuation">.</span><span class="token function">render<span class="token punctuation">(</span></span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> error<span class="token punctuation">:</span> err <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如果您的路由处理程序具有多个回调函数，则可以使用</font></font><code>route</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">参数跳到下一个路由处理程序。</font><font style="vertical-align: inherit;">例如：</font></font></p>

<pre class="  language-javascript"><code class="  language-javascript">app<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">'/a_route_behind_paywall'</span><span class="token punctuation">,</span>
  <span class="token keyword">function</span> checkIfPaidSubscriber <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>req<span class="token punctuation">.</span>user<span class="token punctuation">.</span>hasPaid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment" spellcheck="true">// continue handling this request
</span>      <span class="token function">next<span class="token punctuation">(</span></span><span class="token string">'route'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">next<span class="token punctuation">(</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> getPaidContent <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    PaidContent<span class="token punctuation">.</span><span class="token function">find<span class="token punctuation">(</span></span><span class="token keyword">function</span> <span class="token punctuation">(</span>err<span class="token punctuation">,</span> doc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">next<span class="token punctuation">(</span></span>err<span class="token punctuation">)</span>
      res<span class="token punctuation">.</span><span class="token function">json<span class="token punctuation">(</span></span>doc<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">在此示例中，</font></font><code>getPaidContent</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">将跳过处理程序，但是</font></font><code>app</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">for中</font><font style="vertical-align: inherit;">剩余的所有处理程序</font></font><code>/a_route_behind_paywall</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">将继续执行。</font></font></p>

<div class="doc-box doc-info">
  <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">调用</font></font><code>next()</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">并</font></font><code>next(err)</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">指示当前处理程序已完成并且处于什么状态。  </font></font><code>next(err)</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">将跳过链中所有剩余的处理程序，但如上所述的那些设置为处理错误的处理程序除外。</font></font></p>
</div>

      </div>