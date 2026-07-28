/* Интерактив прототипа. Без библиотек, работает при открытии файла с диска. */

;(function () {
  var reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function $(sel, root) {
    return (root || document).querySelector(sel)
  }

  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel))
  }

  /* ---------- Печать текста по буквам ---------- */

  function typeText(el, text, duration, done) {
    if (reduced) {
      el.textContent = text
      if (done) done()
      return
    }

    var startedAt = Date.now()
    var timer = setInterval(function () {
      var progress = Math.min(1, (Date.now() - startedAt) / duration)
      el.textContent = text.slice(0, Math.ceil(text.length * progress))

      if (progress >= 1) {
        clearInterval(timer)
        if (done) done()
      }
    }, 40)
  }

  /* ---------- Уведомление ---------- */

  var toastEl
  var toastTimer

  function toast(text) {
    if (!toastEl) {
      toastEl = document.createElement('div')
      toastEl.className = 'toast'
      document.body.appendChild(toastEl)
    }

    toastEl.textContent = text
    requestAnimationFrame(function () {
      toastEl.classList.add('is-on')
    })
    clearTimeout(toastTimer)
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-on')
    }, 2600)
  }

  /* ---------- Активный пункт меню ---------- */

  function markCurrentPage() {
    var page = location.pathname.split('/').pop() || 'index.html'

    $$('.nav a, .mock-nav a').forEach(function (a) {
      var href = a.getAttribute('href') || ''
      if (href.split('#')[0] === page) a.classList.add('is-current')
    })
  }

  /* ---------- Появление блоков при скролле ---------- */

  function initReveal() {
    if (reduced || !('IntersectionObserver' in window)) return

    var selectors =
      '.card, .rstep, .post, .step, .quote, .trust > div, .split > div, .cta, .compare-wrap, .lawyer, .price-grid > *, .faq details, .stat-row, .panel, .calc-result, .related a'
    var items = $$(selectors).filter(function (el) {
      return !el.closest('.hero') && !el.closest('.chatpage')
    })

    if (!items.length) return

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          var el = entry.target
          var delay = Number(el.dataset.revealDelay || 0)
          setTimeout(function () {
            el.classList.add('is-visible')
          }, delay)
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    )

    items.forEach(function (el) {
      var siblings = Array.prototype.slice.call(el.parentElement.children)
      var index = siblings.indexOf(el)
      el.classList.add('reveal')
      el.dataset.revealDelay = String(Math.min(index, 5) * 70)
      io.observe(el)
    })

    // Подстраховка: если observer по какой-то причине не сработал,
    // блоки все равно показываются – скрытый контент хуже отсутствия анимации.
    function showNearby() {
      items.forEach(function (el) {
        if (el.classList.contains('is-visible')) return
        if (el.getBoundingClientRect().top < window.innerHeight * 1.4) {
          el.classList.add('is-visible')
        }
      })
    }

    var ticking = false
    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return
        ticking = true
        requestAnimationFrame(function () {
          showNearby()
          ticking = false
        })
      },
      { passive: true }
    )

    setTimeout(showNearby, 1200)
    setTimeout(function () {
      items.forEach(function (el) {
        el.classList.add('is-visible')
      })
    }, 6000)
  }

  /* ---------- Счетчики ---------- */

  function initCounters() {
    if (reduced || !('IntersectionObserver' in window)) return

    var nodes = $$('.trust b, .stat-row b').filter(function (el) {
      return /^[^\d]{0,2}[\d\s]{2,}[^\d]{0,12}$/.test(el.textContent.trim())
    })

    if (!nodes.length) return

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return
          animateNumber(entry.target)
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.4 }
    )

    nodes.forEach(function (el) {
      io.observe(el)
    })
  }

  function animateNumber(el) {
    var raw = el.textContent
    var match = raw.match(/[\d\s]{2,}/)
    if (!match) return

    var target = Number(match[0].replace(/\s/g, ''))
    if (!isFinite(target) || target <= 0) return

    var prefix = raw.slice(0, match.index)
    var suffix = raw.slice(match.index + match[0].length)
    var start = performance.now()
    var duration = 900

    function frame(now) {
      var p = Math.min(1, (now - start) / duration)
      var eased = 1 - Math.pow(1 - p, 3)
      var value = Math.round(target * eased)
      el.textContent = prefix + value.toLocaleString('ru-RU') + suffix
      if (p < 1) requestAnimationFrame(frame)
    }

    el.textContent = prefix + '0' + suffix
    requestAnimationFrame(frame)
  }

  /* ---------- Кнопка наверх ---------- */

  function initToTop() {
    if (document.body.scrollHeight < 2600) return

    var btn = document.createElement('button')
    btn.className = 'to-top'
    btn.type = 'button'
    btn.title = 'Наверх'
    btn.textContent = '↑'
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    })
    document.body.appendChild(btn)

    window.addEventListener(
      'scroll',
      function () {
        btn.classList.toggle('is-on', window.scrollY > 900)
      },
      { passive: true }
    )
  }

  /* ---------- Демо-чат на первом экране лендинга ---------- */

  function initHeroChat() {
    var box = $('[data-hero-chat]')
    if (!box || reduced) return

    var bubbles = $$('.bubble', box)
    var last = bubbles[bubbles.length - 1]
    if (!last) return

    var typing = document.createElement('div')
    typing.className = 'bubble bubble--ai'
    typing.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>'

    last.style.display = 'none'
    last.parentElement.insertBefore(typing, last)

    setTimeout(function () {
      typing.remove()
      last.style.display = ''
      last.classList.add('bubble--enter')
    }, 1800)
  }

  /* ---------- Калькулятор стоимости ---------- */

  var FEE_MANAGER = 25000
  var FEE_PUBLICATIONS = 20000

  function initCalculator() {
    var root = $('[data-calc]')
    if (!root) return

    var state = { debt: 1800000, property: 'no', enforcement: 'open' }

    var debtInput = $('#calc-debt', root)
    var debtValue = $('#calc-debt-value', root)
    var resultBox = $('#calc-result')
    if (!debtInput || !resultBox) return

    $$('.segmented', root).forEach(function (group) {
      group.addEventListener('click', function (event) {
        var btn = event.target.closest('button')
        if (!btn) return
        $$('button', group).forEach(function (b) {
          b.classList.remove('is-on')
        })
        btn.classList.add('is-on')
        state[group.dataset.field] = btn.dataset.value
        render()
      })
    })

    debtInput.addEventListener('input', function () {
      state.debt = Number(debtInput.value)
      render()
    })

    function money(value) {
      return value.toLocaleString('ru-RU') + ' ₽'
    }

    function render() {
      debtValue.textContent = money(state.debt)
      debtValue.classList.remove('num-flip')
      void debtValue.offsetWidth
      debtValue.classList.add('num-flip')

      var mfcFits =
        state.debt <= 1000000 &&
        state.property === 'no' &&
        state.enforcement === 'closed'

      var result = $('#calc-result')
      result.classList.toggle('calc-result--free', mfcFits)

      if (mfcFits) {
        result.innerHTML =
          '<span class="tag tag--free">Вам не нужно платить</span>' +
          '<h3>Подходит бесплатное банкротство через МФЦ</h3>' +
          '<p class="muted small">Долг до 1 млн ₽, имущества нет, исполнительное производство окончено – это условия внесудебной процедуры. Она бесплатная: ни депозита, ни пошлины, ни наших услуг. Подскажем порядок подачи и проверим заявление.</p>' +
          '<div class="calc-rows">' +
          '<div><span>Обязательные расходы</span><span>0 ₽</span></div>' +
          '<div><span>Наша работа</span><span>не требуется</span></div>' +
          '<div><span>Срок процедуры</span><span>около 6 месяцев</span></div>' +
          '</div>' +
          '<a class="btn btn--ghost" href="chat.html">Проверить условия в чате</a>'
        return
      }

      var reasons = []
      if (state.debt > 1000000) reasons.push('долг больше 1 млн ₽')
      if (state.property === 'yes')
        reasons.push('есть имущество кроме единственного жилья')
      if (state.enforcement === 'open')
        reasons.push('исполнительное производство не окончено')

      result.innerHTML =
        '<span class="tag tag--accent">Ваш маршрут</span>' +
        '<h3>Судебное банкротство</h3>' +
        '<p class="muted small">Внесудебная процедура не подходит: ' +
        reasons.join(', ') +
        '. Ниже – обязательные расходы, они одинаковы независимо от того, наняли вы юриста или делаете сами.</p>' +
        '<div class="calc-rows">' +
        '<div><span>Депозит финансового управляющего</span><span>' +
        money(FEE_MANAGER) +
        '</span></div>' +
        '<div><span>Публикации <span class="slot" title="Сумму подтверждает Дмитрий">≈</span></span><span>' +
        money(FEE_PUBLICATIONS) +
        '</span></div>' +
        '<div><span>Обязательные расходы, итого</span><span>' +
        money(FEE_MANAGER + FEE_PUBLICATIONS) +
        '</span></div>' +
        '<div><span>Наша работа</span><span class="slot" title="Цену определяет Дмитрий">– ₽</span></div>' +
        '</div>' +
        '<p class="tiny muted">Расчет предварительный: точную сумму и состав пакета подтверждает юрист после разбора. Гарантий списания не даем – решение принимает суд.</p>' +
        '<a class="btn btn--primary" href="chat.html">Разобрать мою ситуацию</a>'
    }

    render()
  }

  /* ---------- Живой чат ---------- */

  var CHAT_SCRIPT = [
    {
      ai: 'Здравствуйте. Чтобы понять вашу ситуацию, начнем с главного: какая примерно сумма долгов и кому вы должны – банки, микрозаймы, налоги, коммунальные?',
      quick: ['Около 1,8 млн: банки, карты, микрозайм', 'Меньше миллиона']
    },
    {
      ai: 'Спасибо. Теперь про имущество и доход – от этого зависит и процедура, и что будет с вещами:<ul><li>есть ли квартира или дом, и не в ипотеке ли;</li><li>есть ли машина, доля в другом жилье, дача;</li><li>официальный доход сейчас есть?</li></ul>',
      quick: [
        'Квартира одна, без ипотеки. Работаю официально',
        'Есть машина и дача'
      ]
    },
    {
      ai: 'Понятно, картина типовая. Один важный вопрос – о нем часто забывают, а суд смотрит: за последние 3 года вы продавали или дарили что-нибудь – машину, долю в квартире, дачу? И не брали ли новые кредиты уже после того, как платить стало нечем?',
      quick: ['Продал машину в 2024 году', 'Ничего не продавал']
    },
    {
      ai: '<b>Ваш путь – судебное банкротство.</b> Бесплатное банкротство через МФЦ вам не подходит: там лимит долга 1 млн ₽. Продажа машины в 2024 – не проблема сама по себе, но управляющий будет проверять цену сделки, поэтому договор и подтверждение оплаты нужно сохранить.',
      result: true
    }
  ]

  function initChat() {
    var thread = $('#chat-thread')
    if (!thread) return

    var quickBox = $('#chat-quick')
    var form = $('#chat-form')
    var input = $('#chat-input')
    var replayBtn = $('#chat-replay')
    var step = 0
    var busy = false

    function scrollBottom() {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: reduced ? 'auto' : 'smooth'
      })
    }

    function addBubble(kind, html, meta) {
      var el = document.createElement('div')
      el.className = 'bubble bubble--' + kind + ' bubble--enter'
      el.innerHTML = html
      if (meta) {
        var m = document.createElement('div')
        m.className = 'bubble-meta'
        m.innerHTML = meta
        el.appendChild(m)
      }
      thread.appendChild(el)
      scrollBottom()
      return el
    }

    function showTyping(kind) {
      var el = document.createElement('div')
      el.className = 'bubble bubble--' + (kind || 'ai')
      el.innerHTML = '<span class="typing"><i></i><i></i><i></i></span>'
      thread.appendChild(el)
      scrollBottom()
      return el
    }

    function renderQuick(options) {
      quickBox.innerHTML = ''
      ;(options || []).forEach(function (text) {
        var btn = document.createElement('button')
        btn.className = 'chip'
        btn.type = 'button'
        btn.textContent = text
        btn.addEventListener('click', function () {
          send(text)
        })
        quickBox.appendChild(btn)
      })
    }

    function resultCard() {
      var el = document.createElement('div')
      el.className = 'result bubble--enter'
      el.innerHTML =
        '<div><span class="tag tag--accent">Предварительный разбор</span>' +
        '<h3 style="margin-top:12px">Судебное банкротство, реализация имущества</h3></div>' +
        '<div class="result-rows">' +
        '<div><span>Сумма долга</span><span>~1,84 млн ₽</span></div>' +
        '<div><span>Единственное жилье</span><span>защищено, вне конкурсной массы</span></div>' +
        '<div><span>Что проверит юрист</span><span>сделку 2024 года и платежи с февраля</span></div>' +
        '<div><span>Обязательные расходы</span><span class="slot" title="Суммы подтверждает Дмитрий">~45 000 ₽</span></div>' +
        '<div><span>Наша работа</span><span class="slot" title="Цену определяет Дмитрий">– ₽, оплата этапами</span></div>' +
        '<div><span>Ориентировочный срок</span><span>8–14 месяцев активной части</span></div>' +
        '</div>' +
        '<p class="tiny muted">Следующий шаг – проверка юристом: Дмитрий смотрит слабые места и подтверждает план. Это бесплатно и ни к чему не обязывает.</p>'
      thread.appendChild(el)
      scrollBottom()
    }

    function captureCard() {
      var el = document.createElement('div')
      el.className = 'capture bubble--enter'
      el.innerHTML =
        '<h3>Куда отправить полный разбор и памятку по документам</h3>' +
        '<p class="muted small">Пришлем разбор с расчетом, список нужных справок и порядок действий. Здесь же юрист ответит на ваши вопросы – текстом, без звонков, если вы этого не хотите.</p>' +
        '<div class="btn-row">' +
        '<input class="real-input" id="capture-input" type="text" placeholder="Телефон или e-mail" style="min-width:240px" />' +
        '<button class="btn btn--primary" id="capture-send" type="button">Получить разбор</button>' +
        '</div>' +
        '<label class="tiny muted" style="display:flex;gap:8px;align-items:flex-start">' +
        '<input type="checkbox" /><span>Хочу, чтобы юрист перезвонил – выберу удобное время</span></label>'
      thread.appendChild(el)
      scrollBottom()

      $('#capture-send', el).addEventListener('click', function () {
        var value = $('#capture-input', el).value.trim()
        if (value.length < 5) {
          toast(
            'Введите телефон или e-mail – это макет, данные никуда не уходят'
          )
          $('#capture-input', el).focus()
          return
        }

        el.innerHTML =
          '<span class="tag tag--free">Разбор отправлен</span>' +
          '<h3 style="margin-top:10px">Готово, отправили на ' +
          value.replace(/</g, '&lt;') +
          '</h3>' +
          '<p class="muted small">Юрист уже видит вашу заявку. Ответ придет сюда же и продублируется в письме.</p>'

        lawyerReply()
      })
    }

    function lawyerReply() {
      var typing = showTyping('lawyer')
      typing.insertAdjacentHTML(
        'beforeend',
        '<span class="tiny muted" style="margin-left:8px">Дмитрий печатает…</span>'
      )

      setTimeout(function () {
        typing.remove()
        addBubble(
          'lawyer',
          '<b>Дмитрий Ерзиков, финансовый управляющий:</b> посмотрел ваш разбор. Сделка 2024 года рисков не создает, если цена была рыночной – приложите договор и выписку о поступлении денег. Начните с трех справок: о задолженности из банков, из ФНС и выписки по счетам за 3 года. Дальше соберем пакет.',
          'Ответ человека, не AI · <span class="slot" title="Время ответа подтверждает Дмитрий">ответ в рабочее время</span>'
        )
        renderQuick([
          'Что будет с картами?',
          'Сколько это займет по времени?',
          'Можно без звонков?'
        ])
        busy = false
      }, 2600)
    }

    function aiAnswer(text) {
      var typing = showTyping('ai')

      setTimeout(function () {
        typing.remove()
        addBubble(
          'ai',
          text,
          'Ответ подготовлен с помощью AI. Это разбор ситуации, а не гарантия исхода: решение о списании принимает суд.'
        )
        busy = false
      }, 1500)
    }

    var FALLBACK = {
      карт: 'Счетами в процедуре распоряжается управляющий, карты обычно блокируются. Из дохода ежемесячно выделяются средства на жизнь – подробно об этом на странице «Путь по шагам», раздел про деньги.',
      врем: 'Подготовка занимает 2–6 недель, от подачи до первого заседания обычно 1–2 месяца, сама процедура – от 6 месяцев. Средний полный цикл дела – около полутора лет.',
      звон: 'Можно полностью текстом: разбор в чате, вопросы юристу здесь же. Звонок – только если вы сами его попросите и выберете время.',
      цен: 'Обязательные расходы – депозит управляющего 25 000 ₽ и публикации около 20 000 ₽. Стоимость наших услуг фиксированная, она указана на странице цены.'
    }

    function fallbackFor(text) {
      var lower = text.toLowerCase()
      var found = Object.keys(FALLBACK).find(function (key) {
        return lower.indexOf(key) !== -1
      })

      return found
        ? FALLBACK[found]
        : 'Записал. Этот вопрос лучше уточнит юрист – передаю ваше сообщение Дмитрию вместе с разбором. Он ответит здесь же в рабочее время.'
    }

    function send(text) {
      if (busy || !text) return
      busy = true
      addBubble('user', text.replace(/</g, '&lt;'))
      renderQuick([])

      if (step < CHAT_SCRIPT.length) {
        var node = CHAT_SCRIPT[step]
        step += 1

        setTimeout(function () {
          var typing = showTyping('ai')
          setTimeout(function () {
            typing.remove()
            addBubble(
              'ai',
              node.ai,
              'Ответ подготовлен с помощью AI. Критичное перед подачей проверяет юрист.'
            )

            if (node.result) {
              setTimeout(function () {
                resultCard()
                captureCard()
                busy = false
              }, 700)
            } else {
              renderQuick(node.quick)
              busy = false
            }
          }, 1400)
        }, 350)
        return
      }

      aiAnswer(fallbackFor(text))
    }

    function start() {
      thread.innerHTML = ''
      step = 0
      busy = true
      var typing = showTyping('ai')

      setTimeout(function () {
        typing.remove()
        addBubble('ai', CHAT_SCRIPT[0].ai)
        renderQuick(CHAT_SCRIPT[0].quick)
        step = 1
        busy = false
      }, 900)
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault()
      var value = input.value.trim()
      if (!value) return
      input.value = ''
      send(value)
    })

    if (replayBtn) {
      replayBtn.addEventListener('click', start)
    }

    var fileBtn = $('#chat-file')
    if (fileBtn) {
      fileBtn.addEventListener('click', function () {
        toast(
          'В макете загрузка файлов отключена – на живом сайте здесь фото и PDF'
        )
      })
    }

    start()
  }

  /* ---------- Роадмап: прогресс и фильтр ролей ---------- */

  function initRoadmap() {
    var map = $('.rmap')
    if (!map) return

    var steps = $$('.rstep', map)

    function onScroll() {
      var rect = map.getBoundingClientRect()
      var viewMiddle = window.innerHeight * 0.55
      var passed = Math.min(Math.max(viewMiddle - rect.top, 0), rect.height)
      map.style.setProperty(
        '--rmap-progress',
        ((passed / rect.height) * 100).toFixed(1) + '%'
      )

      steps.forEach(function (step) {
        var top = step.getBoundingClientRect().top
        step.classList.toggle('is-done', top < viewMiddle)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    var filter = $('[data-role-filter]')
    if (!filter) return

    filter.addEventListener('click', function (event) {
      var btn = event.target.closest('button')
      if (!btn) return

      $$('button', filter).forEach(function (b) {
        b.classList.remove('is-on')
      })
      btn.classList.add('is-on')

      var role = btn.dataset.role

      $$('.role').forEach(function (card) {
        var match = role === 'all' || card.classList.contains('role--' + role)
        card.classList.toggle('is-dim', !match)
      })
    })
  }

  /* ---------- Блог: фильтр рубрик ---------- */

  function initBlogFilter() {
    var row = $('[data-blog-filter]')
    if (!row) return

    var posts = $$('.post')
    var counter = $('#blog-count')

    row.addEventListener('click', function (event) {
      var chip = event.target.closest('.chip')
      if (!chip) return
      event.preventDefault()

      $$('.chip', row).forEach(function (c) {
        c.classList.remove('is-on')
      })
      chip.classList.add('is-on')

      var cat = chip.dataset.cat
      var shown = 0

      posts.forEach(function (post) {
        var match = cat === 'all' || post.dataset.cat === cat
        post.classList.toggle('is-hidden', !match)
        if (match) shown += 1
      })

      if (counter) {
        counter.textContent =
          shown +
          (shown === 1 ? ' материал' : shown < 5 ? ' материала' : ' материалов')
      }
    })
  }

  /* ---------- Статья: прогресс чтения и оглавление ---------- */

  function initArticle() {
    var body = $('.article-body')
    if (!body) return

    var bar = document.createElement('div')
    bar.className = 'readbar'
    document.body.appendChild(bar)

    var headings = $$('h2', body)
    var tocItems = $$('.toc li')

    headings.forEach(function (h, i) {
      if (!h.id) h.id = 'section-' + (i + 1)
    })

    tocItems.forEach(function (li, i) {
      var heading = headings[i]
      if (!heading) return
      var text = li.textContent
      li.innerHTML = '<a href="#' + heading.id + '">' + text + '</a>'
    })

    function onScroll() {
      var rect = body.getBoundingClientRect()
      var total = rect.height - window.innerHeight
      var passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      bar.style.transform =
        'scaleX(' + (passed / Math.max(total, 1)).toFixed(3) + ')'

      var currentIndex = 0
      headings.forEach(function (h, i) {
        if (h.getBoundingClientRect().top < 140) currentIndex = i
      })

      tocItems.forEach(function (li, i) {
        li.classList.toggle('is-current', i === currentIndex)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  /* ---------- Админка ---------- */

  var LEADS = {
    sergey: {
      name: 'Сергей М.',
      tag: 'судебное банкротство',
      tagClass: 'tag--accent',
      meta: 'Заявка от 28.07.2026, 09:12 · телефон <span class="mono">+7 9•• ••• 41 08</span> · Самарская область',
      facts: [
        ['Сумма долга', '1,84 млн ₽'],
        ['Кредиторы', '3 банка, 1 МФО, ЖКХ'],
        ['Имущество', 'единственное жилье, без ипотеки'],
        ['Доход', 'официальный, 70 тыс. ₽'],
        ['Стадия взыскания', 'коллекторы, приставов нет'],
        ['Риск, отмеченный AI', 'продажа авто в 2024 – проверить цену']
      ],
      dialog: [
        [
          'user',
          '1,8 млн: три кредита, две карты, микрозайм и коммуналка 40 тысяч.'
        ],
        [
          'ai',
          'Уточняю про имущество и доход: квартира, машина, официальная работа?'
        ],
        [
          'user',
          'Квартира одна, без ипотеки. Машины нет, продал в 2024. Работаю, 70 тысяч.'
        ],
        [
          'ai',
          'МФЦ не подходит – долг больше 1 млн. Путь – судебное банкротство, сделку 2024 нужно проверить.'
        ]
      ],
      draft:
        'Сергей, посмотрел ваш разбор. Сделка 2024 года рисков не создает, если цена была рыночной – приложите договор и выписку о поступлении денег. Начните с трех справок: о задолженности из банков, из ФНС и выписки по счетам за 3 года. Дальше соберем пакет документов.',
      files: '2 документа (договор купли-продажи, справка из банка)'
    },
    natalya: {
      name: 'Наталья К.',
      tag: 'подходит МФЦ',
      tagClass: 'tag--free',
      meta: 'Заявка от 28.07.2026, 08:44 · e-mail <span class="mono">n•••@mail.ru</span> · Тольятти',
      facts: [
        ['Сумма долга', '640 тыс. ₽'],
        ['Кредиторы', '2 МФО, 1 банк'],
        ['Имущество', 'нет, жилье съемное'],
        ['Доход', 'пособие на ребенка'],
        ['Стадия взыскания', 'производство окончено, приставы вернули лист'],
        ['Риск, отмеченный AI', 'нет – условия внесудебной процедуры выполнены']
      ],
      dialog: [
        [
          'user',
          'Долг примерно 640 тысяч, приставы закрыли производство в прошлом году.'
        ],
        ['ai', 'Имущество есть? Машина, доля в квартире, дача?'],
        ['user', 'Ничего нет, квартиру снимаю. Живу на детское пособие.'],
        [
          'ai',
          'Ваш случай проходит через МФЦ бесплатно – платить за процедуру не нужно, объясняю порядок подачи.'
        ]
      ],
      draft:
        'Наталья, по вашим данным подходит внесудебное банкротство через МФЦ: долг до 1 млн, имущества нет, производство окончено. Это бесплатно, наши услуги не нужны. Список долгов составьте полностью – спишутся только те, что укажете в заявлении. Если что-то не сойдется в МФЦ, напишите, поможем разобраться.',
      files: 'постановление об окончании производства'
    },
    igor: {
      name: 'Игорь Т.',
      tag: 'сложный кейс',
      tagClass: '',
      meta: 'Заявка от 28.07.2026, 07:10 · телефон <span class="mono">+7 9•• ••• 12 55</span> · Москва',
      facts: [
        ['Сумма долга', '4,2 млн ₽'],
        ['Кредиторы', '2 банка, ипотека, налоговая'],
        ['Имущество', 'квартира в ипотеке, автомобиль 2022 года'],
        ['Доход', 'ИП закрыт в 2025, сейчас подработки'],
        ['Стадия взыскания', 'иск банка, заседание через месяц'],
        ['Риск, отмеченный AI', 'ипотека и дарение доли родственнику в 2024']
      ],
      dialog: [
        [
          'user',
          'Долг 4,2 млн, есть ипотека. Закрыл ИП, налоговая тоже требует.'
        ],
        ['ai', 'Были ли сделки за 3 года – дарение, продажа доли?'],
        ['user', 'Подарил долю в дачном доме брату в прошлом году.'],
        [
          'ai',
          'Это зона риска: сделку могут оспорить. Нужна оценка живого юриста до подачи.'
        ]
      ],
      draft:
        'Игорь, ваш случай не типовой: ипотека и дарение доли в 2024 году – две темы, где нужна позиция до подачи, а не после. Предлагаю разобрать отдельно: пришлите договор дарения, график по ипотеке и требование налоговой. Сроки по иску банка тоже учтем.',
      files:
        '4 документа (график ипотеки, требование ФНС, договор дарения, выписка)'
    },
    anon: {
      name: 'Аноним',
      tag: 'не наш случай',
      tagClass: '',
      meta: 'Заявка от 28.07.2026, 06:20 · контакт не оставлен',
      facts: [
        ['Сумма долга', 'долг работодателя перед клиентом'],
        ['Кредиторы', '—'],
        ['Имущество', '—'],
        ['Доход', '—'],
        ['Стадия взыскания', '—'],
        ['Риск, отмеченный AI', 'тема не про банкротство гражданина']
      ],
      dialog: [
        ['user', 'Работодатель не платит зарплату полгода, что делать?'],
        [
          'ai',
          'Это трудовой спор, а не банкротство должника. Подскажу, куда обратиться, но наша услуга здесь не нужна.'
        ]
      ],
      draft:
        'Здравствуйте. Ваш вопрос не про банкротство гражданина: невыплата зарплаты решается через трудовую инспекцию и суд. Наша услуга вам не нужна – ниже короткая инструкция, куда обратиться.',
      files: 'нет'
    }
  }

  function initAdmin() {
    var list = $('[data-lead-list]')
    if (!list) return

    var nameEl = $('#lead-name')
    var metaEl = $('#lead-meta')
    var tagEl = $('#lead-tag')
    var factsEl = $('#lead-facts')
    var dialogEl = $('#lead-dialog')
    var filesEl = $('#lead-files')
    var draftEl = $('#lead-draft')
    var draftBtn = $('#draft-generate')
    var sendBtn = $('#draft-send')
    var statusSelect = $('#lead-outcome')
    var statusBadge = $('#lead-status')
    var current = 'sergey'

    function renderLead(key) {
      var lead = LEADS[key]
      if (!lead) return
      current = key

      nameEl.textContent = lead.name
      metaEl.innerHTML = lead.meta
      tagEl.className = 'tag ' + lead.tagClass
      tagEl.textContent = lead.tag

      factsEl.innerHTML = lead.facts
        .map(function (pair) {
          return '<div><dt>' + pair[0] + '</dt><dd>' + pair[1] + '</dd></div>'
        })
        .join('')

      dialogEl.innerHTML = lead.dialog
        .map(function (row) {
          return (
            '<div class="bubble bubble--' +
            row[0] +
            '" style="max-width:92%">' +
            row[1] +
            '</div>'
          )
        })
        .join('')

      filesEl.textContent = 'Файлы клиента: ' + lead.files

      draftEl.innerHTML =
        '<p class="tiny" style="font-weight:600">Черновик AI</p>' +
        '<p class="muted">Нажмите «Сгенерировать черновик», чтобы AI подготовил ответ по этой заявке.</p>'
      draftEl.classList.add('is-empty')

      statusSelect.value = ''
      statusBadge.className = 'badge-status'
      statusBadge.textContent = 'Итог не выставлен'

      $$('.lead-item', list).forEach(function (item) {
        item.classList.toggle('lead-item--active', item.dataset.lead === key)
      })
    }

    list.addEventListener('click', function (event) {
      var item = event.target.closest('.lead-item')
      if (!item) return
      renderLead(item.dataset.lead)
    })

    draftBtn.addEventListener('click', function () {
      var text = LEADS[current].draft
      draftEl.classList.remove('is-empty')
      draftEl.innerHTML =
        '<p class="tiny" style="font-weight:600">Черновик AI · виден только вам, клиенту не отправлен</p>' +
        '<p id="draft-text" class="caret"></p>'

      var target = $('#draft-text', draftEl)

      if (reduced) {
        target.textContent = text
        target.classList.remove('caret')
        finishDraft()
        return
      }

      typeText(target, text, 1400, function () {
        target.classList.remove('caret')
        finishDraft()
      })

      function finishDraft() {
        draftEl.insertAdjacentHTML(
          'beforeend',
          '<div class="btn-row">' +
            '<button class="btn btn--primary btn--sm" id="draft-send" type="button">Правки и отправить</button>' +
            '<button class="btn btn--ghost btn--sm" id="draft-again" type="button">Переписать заново</button>' +
            '</div>' +
            '<p class="tiny muted">Отправляется как ответ юриста – без пометки AI, потому что вы его прочитали и подтвердили. Черновик и отправленный текст хранятся отдельно: по разнице видно, что AI формулирует не так.</p>'
        )

        $('#draft-send', draftEl).addEventListener('click', function () {
          dialogEl.insertAdjacentHTML(
            'beforeend',
            '<div class="bubble bubble--lawyer bubble--enter" style="max-width:92%"><b>Ответ юриста:</b> ' +
              $('#draft-text', draftEl).textContent +
              '</div>'
          )
          dialogEl.scrollTop = dialogEl.scrollHeight
          toast('Ответ отправлен клиенту и записан в карточку заявки')
        })

        $('#draft-again', draftEl).addEventListener('click', function () {
          draftBtn.click()
        })
      }
    })

    if (sendBtn) sendBtn.remove()

    statusSelect.addEventListener('change', function () {
      var value = statusSelect.value
      if (!value) return

      statusBadge.textContent =
        statusSelect.options[statusSelect.selectedIndex].text
      statusBadge.className =
        'badge-status' + (value === 'won' ? ' badge-status--won' : '')
      toast('Итог сохранен и уйдет в Яндекс.Метрику как оффлайн-конверсия')
    })

    renderLead('sergey')
  }

  /* ---------- Раздел документов: переключение ---------- */

  function initDocs() {
    var nav = $('[data-docs-nav]')
    if (!nav) return

    nav.addEventListener('click', function (event) {
      var btn = event.target.closest('button')
      if (!btn) return

      $$('button', nav).forEach(function (b) {
        b.classList.remove('is-on')
      })
      btn.classList.add('is-on')

      var name = btn.dataset.doc

      $$('[data-pane]').forEach(function (pane) {
        pane.classList.toggle('is-on', pane.dataset.pane === name)
      })

      if (window.scrollY > 320) {
        window.scrollTo({ top: 320, behavior: reduced ? 'auto' : 'smooth' })
      }
    })

    // Открыть нужный раздел по якорю: docs.html#refund
    function openFromHash() {
      var hash = location.hash.replace('#', '')
      if (!hash) return
      var target = $('[data-doc="' + hash + '"]', nav)
      if (target && !target.classList.contains('is-on')) target.click()
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)
  }

  /* ---------- Мок Telegram: заявка приходит юристу ---------- */

  var TG_LEAD = {
    name: 'Сергей М.',
    lines: [
      ['Долг', '1,84 млн ₽'],
      ['Регион', 'Самарская область'],
      ['Маршрут AI', 'судебное банкротство'],
      ['Риск', 'продажа авто в 2024'],
      ['Источник', 'директ / банкротство-цена']
    ],
    draft:
      'Сергей, посмотрел ваш разбор. Сделка 2024 года рисков не создает, если цена была рыночной – приложите договор и выписку о поступлении денег. Начните с трех справок: о задолженности из банков, из ФНС и выписки по счетам за 3 года.'
  }

  function initTelegram() {
    var body = $('#tg-body')
    if (!body) return

    function add(kind, html) {
      var el = document.createElement('div')
      el.className = 'tg-msg' + (kind ? ' tg-msg--' + kind : '')
      el.innerHTML = html
      el.classList.add('bubble--enter')
      body.appendChild(el)
      body.scrollTop = body.scrollHeight
      return el
    }

    function time() {
      return '<div class="tg-time">09:12</div>'
    }

    function leadCard() {
      var rows = TG_LEAD.lines
        .map(function (pair) {
          return (
            '<div><span>' +
            pair[0] +
            '</span><span>' +
            pair[1] +
            '</span></div>'
          )
        })
        .join('')

      var msg = add(
        '',
        '<b>Новая заявка · ' +
          TG_LEAD.name +
          '</b>' +
          '<div class="tg-lines">' +
          rows +
          '</div>' +
          '<div class="tg-btns">' +
          '<button type="button" data-act="draft">Сгенерировать черновик</button>' +
          '<button type="button" data-act="outcome">Итог по заявке</button>' +
          '<button type="button" class="tg-btn--wide" data-act="panel">Открыть заявку в панели</button>' +
          '</div>' +
          time()
      )

      msg.addEventListener('click', function (event) {
        var btn = event.target.closest('button')
        if (!btn) return

        if (btn.dataset.act === 'draft') showDraft()
        if (btn.dataset.act === 'outcome') showOutcome()
        if (btn.dataset.act === 'panel') location.href = 'admin.html'
      })
    }

    function showDraft() {
      var msg = add('', '<b>Черновик ответа</b><p id="tg-draft"></p>')
      var target = $('#tg-draft', msg)
      var text = TG_LEAD.draft
      var startedAt = performance.now()

      target.classList.add('caret')

      typeText(target, text, 1300, function () {
        body.scrollTop = body.scrollHeight
        target.classList.remove('caret')
        msg.insertAdjacentHTML(
          'beforeend',
          '<div class="tg-btns">' +
            '<button type="button" data-act="send">Отправить клиенту</button>' +
            '<button type="button" data-act="again">Переписать</button>' +
            '</div>' +
            time()
        )

        msg.addEventListener('click', function (event) {
          var btn = event.target.closest('button')
          if (!btn) return
          if (btn.dataset.act === 'send') {
            add('out', TG_LEAD.draft + time())
            add(
              'system',
              'Ответ доставлен клиенту в чат на сайте и записан в карточку заявки'
            )
          }
          if (btn.dataset.act === 'again') showDraft()
        })
      })
    }

    function showOutcome() {
      var msg = add(
        '',
        '<b>Чем закончилась заявка?</b>' +
          '<p class="tiny muted">Из этих отметок считается конверсия «заявка – договор».</p>' +
          '<div class="tg-btns">' +
          '<button type="button" data-value="Договор заключен">Договор</button>' +
          '<button type="button" data-value="Отказ – дорого">Отказ: дорого</button>' +
          '<button type="button" data-value="Не дозвонились">Не дозвонились</button>' +
          '<button type="button" data-value="Не наш случай">Не наш случай</button>' +
          '</div>' +
          time()
      )

      msg.addEventListener('click', function (event) {
        var btn = event.target.closest('button')
        if (!btn) return
        add('out', btn.dataset.value + time())
        add(
          'system',
          'Итог записан: ' +
            btn.dataset.value.toLowerCase() +
            ' · уйдет в Яндекс.Метрику как оффлайн-конверсия'
        )
      })
    }

    add('system', 'Сегодня')
    add(
      '',
      '<b>Бот подключен</b><p class="tiny muted">Сюда приходят новые заявки с сайта. Отвечать можно прямо здесь – клиент получит сообщение в чате на сайте.</p>' +
        time()
    )
    setTimeout(leadCard, reduced ? 0 : 900)

    var sendBtn = $('#tg-send')
    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        toast('В макете ввод отключен – нажмите кнопки в карточке заявки')
      })
    }
  }

  /* ---------- Демонстрация пути клиента из рекламы ---------- */

  var SERP = {
    price: {
      query: 'банкротство физлиц цена',
      volume: '1 582 показа в месяц',
      cost: 'клик 400–700 ₽, лид 1 500–7 000 ₽',
      comment:
        'Горячий коммерческий запрос: слой узкий и его выкупают юркомпании. Здесь платный трафик дорогой, поэтому берем не объемом, а честной ценой в объявлении.',
      items: [
        {
          ad: true,
          ours: true,
          url: 'erzikov.ru',
          title: 'Банкротство физлиц: честная цена и бесплатный разбор',
          desc: 'Считаем расходы открыто: депозит управляющего 25 000 ₽, публикации. Ведет действующий финансовый управляющий, реестр 22354.'
        },
        {
          ad: true,
          url: 'юркомпания.рф',
          title: 'Списание долгов от 3 860 ₽ в месяц',
          desc: 'Рассрочка без первого взноса. Бесплатная консультация юриста уже сегодня.'
        },
        {
          url: 'banki.ru › forum',
          title: 'Сколько реально стоит банкротство физлица в 2026 году',
          desc: 'Обсуждение: обязательные расходы, цены юркомпаний, отзывы должников.'
        }
      ]
    },
    mfc: {
      query: 'банкротство через мфц',
      volume: '58 228 показов в месяц',
      cost: 'органика, платный трафик тут не нужен',
      comment:
        'Самый крупный запрос темы, в шесть раз популярнее «юриста по банкротству». Люди ищут бесплатный путь – рекламу здесь ставить бессмысленно, заходим статьей блога.',
      items: [
        {
          url: 'gosuslugi.ru',
          title: 'Внесудебное банкротство через МФЦ: условия и порядок',
          desc: 'Официальная информация о процедуре, требования к сумме долга и исполнительным производствам.'
        },
        {
          ours: true,
          url: 'erzikov.ru › блог',
          title: 'МФЦ или суд: как понять, куда идти с вашими долгами',
          desc: 'Условия внесудебной процедуры по 127-ФЗ, таблица «что выбрать при вашей ситуации», три ошибки, которые стоят полугода.'
        },
        {
          url: 'фцбг.рф › статьи',
          title: 'Банкротство через МФЦ – бесплатно ли это на самом деле',
          desc: 'Разбор условий и подводных камней внесудебной процедуры.'
        }
      ]
    },
    pain: {
      query: 'нечем платить кредит что делать',
      volume: '2 280 показов в месяц',
      cost: 'РСЯ и соцсети: 200–1 500 ₽ за лид, но до 70% нецелевых',
      comment:
        'Запрос про боль, а не про услугу. Человек еще не знает слова «банкротство» – здесь работают баннеры по интересам и AI-разбор, который отсеет нецелевых до дорогого аукциона.',
      items: [
        {
          ours: true,
          url: 'erzikov.ru › блог',
          title: 'Нечем платить кредит: первые шаги, пока не поздно',
          desc: 'Что сделать в первый месяц просрочки, о чем можно договориться с банком и когда пора думать о банкротстве.'
        },
        {
          url: 'банк.ру › помощь',
          title: 'Кредитные каникулы и реструктуризация: как оформить',
          desc: 'Условия банка при снижении дохода, документы, сроки рассмотрения.'
        },
        {
          url: 'vc.ru',
          title: 'Что будет, если перестать платить по кредитам',
          desc: 'Личный опыт: звонки, коллекторы, приставы и чем это заканчивается.'
        }
      ]
    }
  }

  function initFunnel() {
    var box = $('[data-serp]')
    if (!box) return

    var switcher = $('[data-serp-switch]')

    function render(key) {
      var data = SERP[key]
      if (!data) return

      var items = data.items
        .map(function (item) {
          return (
            '<div class="serp-item' +
            (item.ours ? ' serp-item--ours' : '') +
            '">' +
            '<div class="serp-url">' +
            (item.ad ? '<span class="serp-label">Реклама</span>' : '') +
            item.url +
            (item.ours ? ' <span class="serp-label">это мы</span>' : '') +
            '</div>' +
            '<div class="serp-title">' +
            item.title +
            '</div>' +
            '<div class="serp-desc">' +
            item.desc +
            '</div>' +
            '</div>'
          )
        })
        .join('')

      box.innerHTML =
        '<div class="serp-bar">' +
        '<div class="fake-input">' +
        data.query +
        '</div>' +
        '<button class="btn btn--primary btn--sm" type="button">Найти</button>' +
        '</div>' +
        '<div class="serp-list">' +
        items +
        '</div>' +
        '<div class="serp-note"><b>' +
        data.volume +
        '</b> · ' +
        data.cost +
        '<br />' +
        data.comment +
        '</div>'
    }

    if (switcher) {
      switcher.addEventListener('click', function (event) {
        var btn = event.target.closest('button')
        if (!btn) return
        $$('button', switcher).forEach(function (b) {
          b.classList.remove('is-on')
        })
        btn.classList.add('is-on')
        render(btn.dataset.query)
      })
    }

    render('price')
  }

  window.__prototypeBuild = '2026-07-28-funnel'

  /* ---------- Запуск ---------- */

  function init() {
    markCurrentPage()
    initReveal()
    initCounters()
    initToTop()
    initHeroChat()
    initCalculator()
    initChat()
    initRoadmap()
    initBlogFilter()
    initArticle()
    initAdmin()
    initDocs()
    initTelegram()
    initFunnel()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
