<template>
  <!-- ==================== HERO SECTION (UNTOUCHED) ==================== -->
  <div
    class="flex flex-col gap-10 justify-center items-center min-h-[60vh] md:min-h-[90vh]"
  >
    <UContainer>
      <p class="text-3xl md:text-5xl md:py-10 font-extralight md:text-center">
        <span class="text-primary text-4xl md:text-7xl"> Enter </span> Your Long
        Hell
        <span class="text-primary font-semibold text-4xl md:text-6xl">Url</span>
        Here to <span class="underline underline-offset-8">Short</span> it For
        <span class="text-green-500 text-6xl font-extrabold"> Free </span>
      </p>
    </UContainer>
    <UContainer class="relative">
      <div class="flex items-center gap-5">
        <UInput
          v-model="url_value"
          label="Enter URL"
          color="primary"
          icon="i-heroicons-arrow-right-20-solid"
          variant="outline"
          placeholder="Enter URL"
          size="xl"
          input-class=" md:min-w-[700px]"
          autofocus
        />
        <UButton
          v-if="!loading"
          :onclick="() => createUrl()"
          color="primary"
          variant="solid"
          icon="material-symbols:kid-star-outline-sharp"
          class="font-extralight text-xl p-3"
        />
        <UButton
          v-else
          color="primary"
          variant="solid"
          icon="line-md:loading-twotone-loop"
          class="font-extralight text-xl p-3"
          disabled
        />
      </div>
      <p v-if="no_value" class="absolute text-orange-500 pt-4">
        Please enter URL
      </p>
    </UContainer>

    <div v-if="data">
      <UContainer
        class="bg-gray-100 dark:bg-gray-800 px-10 py-3 flex gap-4 rounded-lg items-center"
      >
        <p class="border border-dashed py-2 px-3 rounded-lg">
          {{ shortUrl }}
        </p>
        <UButton
          @click="
            () => {
              copied = true;
              copyTextToClipboard(shortUrl);
            }
          "
          variant="outline"
          icon="solar:copy-bold-duotone"
        />
      </UContainer>
      <UAlert
        v-if="copied"
        title="copied to clipboard!"
        variant="outline"
        color="green"
        icon="material-symbols:bookmark-check-outline-sharp"
        class="mt-3"
      />
    </div>
  </div>

  <!-- ==================== FEATURES SECTION ==================== -->
  <section class="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
    <UContainer>
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Why Choose <span class="text-primary">UrlShortener</span>?
        </h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          We offer a powerful, reliable, and completely free URL shortening
          service. Here's what makes us stand out from the crowd.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature Card 1 -->
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
        >
          <div
            class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
          >
            <UIcon
              name="i-heroicons-bolt-20-solid"
              class="text-primary text-2xl"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Lightning Fast</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Generate short URLs in milliseconds. Our optimized infrastructure
            ensures your links are created and redirected with zero lag, so you
            never miss a click.
          </p>
        </div>

        <!-- Feature Card 2 -->
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
        >
          <div
            class="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-500/20 transition-colors"
          >
            <UIcon
              name="i-heroicons-shield-check-20-solid"
              class="text-green-500 text-2xl"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Secure & Reliable</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Every shortened URL is safe and protected. We use HTTPS encryption
            and regularly scan links for malicious content to keep you and your
            audience safe.
          </p>
        </div>

        <!-- Feature Card 3 -->
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
        >
          <div
            class="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors"
          >
            <UIcon
              name="i-heroicons-chart-bar-20-solid"
              class="text-purple-500 text-2xl"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Click Analytics</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Track the performance of your shortened URLs with built-in
            analytics. See how many times your links have been clicked and
            understand your audience better.
          </p>
        </div>

        <!-- Feature Card 4 -->
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
        >
          <div
            class="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors"
          >
            <UIcon
              name="i-heroicons-link-20-solid"
              class="text-orange-500 text-2xl"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Custom Short Links</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Create memorable, branded short links that are easy to share and
            remember. Customize your URLs to match your brand identity and boost
            click-through rates.
          </p>
        </div>

        <!-- Feature Card 5 -->
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
        >
          <div
            class="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-500/20 transition-colors"
          >
            <UIcon
              name="i-heroicons-device-phone-mobile-20-solid"
              class="text-cyan-500 text-2xl"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Mobile Friendly</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Our service is fully responsive and works flawlessly on all devices.
            Shorten URLs on your phone, tablet, or desktop — anytime, anywhere
            with no app required.
          </p>
        </div>

        <!-- Feature Card 6 -->
        <div
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30"
        >
          <div
            class="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-pink-500/20 transition-colors"
          >
            <UIcon
              name="i-heroicons-heart-20-solid"
              class="text-pink-500 text-2xl"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">100% Free Forever</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            No hidden fees, no premium tiers, no limits. UrlShortener is
            completely free to use — today, tomorrow, and always. We believe
            everyone deserves access to great tools.
          </p>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ==================== HOW IT WORKS SECTION ==================== -->
  <section class="py-20 px-4">
    <UContainer>
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          How It <span class="text-primary">Works</span>
        </h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Shortening your URLs has never been easier. Just follow these three
          simple steps and you're good to go.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
        <!-- Step 1 -->
        <div class="text-center">
          <div
            class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-primary text-3xl font-bold">1</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Paste Your URL</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Copy the long URL you want to shorten and paste it into the input
            field above. It can be any valid URL from any website.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="text-center">
          <div
            class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-primary text-3xl font-bold">2</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Click Shorten</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Hit the shorten button and our system will instantly generate a
            unique, compact URL for you. It only takes a fraction of a second.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="text-center">
          <div
            class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-primary text-3xl font-bold">3</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Share Everywhere</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            Copy your new short URL and share it on social media, emails,
            messages, or anywhere you like. Track clicks from your dashboard.
          </p>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ==================== STATS SECTION ==================== -->
  <section class="py-16 px-4 bg-primary/5">
    <UContainer>
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto"
      >
        <div>
          <p class="text-4xl md:text-5xl font-extrabold text-primary mb-2">
            10M+
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-medium">
            Links Shortened
          </p>
        </div>
        <div>
          <p class="text-4xl md:text-5xl font-extrabold text-primary mb-2">
            50M+
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-medium">
            Total Clicks
          </p>
        </div>
        <div>
          <p class="text-4xl md:text-5xl font-extrabold text-green-500 mb-2">
            100%
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-medium">
            Free to Use
          </p>
        </div>
        <div>
          <p class="text-4xl md:text-5xl font-extrabold text-primary mb-2">
            99.9%
          </p>
          <p class="text-gray-500 dark:text-gray-400 font-medium">
            Uptime Guarantee
          </p>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ==================== AD UNIT ==================== -->
  <section class="py-6 px-4">
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <Adsbygoogle />
      </div>
    </UContainer>
  </section>

  <!-- ==================== USE CASES SECTION ==================== -->
  <section class="py-20 px-4">
    <UContainer>
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Perfect For <span class="text-primary">Everyone</span>
        </h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Whether you're a marketer, developer, content creator, or just someone
          who wants cleaner links — UrlShortener is built for you.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          class="flex gap-5 items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0"
          >
            <UIcon
              name="i-heroicons-megaphone-20-solid"
              class="text-blue-500 text-xl"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Social Media Marketers</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Clean, short URLs look better in posts and bios. Track engagement
              across platforms and optimize your campaigns with click data.
            </p>
          </div>
        </div>

        <div
          class="flex gap-5 items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center shrink-0"
          >
            <UIcon
              name="i-heroicons-code-bracket-20-solid"
              class="text-violet-500 text-xl"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Developers & Engineers</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Use our API to integrate URL shortening into your applications,
              bots, or workflows. Simple, fast, and developer-friendly.
            </p>
          </div>
        </div>

        <div
          class="flex gap-5 items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center shrink-0"
          >
            <UIcon
              name="i-heroicons-video-camera-20-solid"
              class="text-rose-500 text-xl"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Content Creators</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Share clean links in video descriptions, blog posts, and
              newsletters. Short URLs are easier for viewers to type and
              remember.
            </p>
          </div>
        </div>

        <div
          class="flex gap-5 items-start p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <div
            class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0"
          >
            <UIcon
              name="i-heroicons-building-office-20-solid"
              class="text-amber-500 text-xl"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Small Businesses</h3>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              Create branded short links for your business. Use them in print
              materials, QR codes, and digital ads to maintain a professional
              appearance.
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ==================== ABOUT SECTION ==================== -->
  <section class="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              About <span class="text-primary">UrlShortener</span>
            </h2>
            <p
              class="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-lg"
            >
              UrlShortener was created with a simple mission: to make sharing
              links as easy and painless as possible. We believe that everyone
              should have access to a fast, reliable, and free URL shortening
              tool.
            </p>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Our platform is built on modern technology, ensuring blazing-fast
              redirects and 99.9% uptime. Whether you need to share a single
              link or manage thousands, we've got you covered.
            </p>
            <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
              We respect your privacy and never sell your data. Your links and
              analytics are yours alone. No trackers, no profiling — just clean,
              straightforward URL shortening.
            </p>
          </div>
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          >
            <h3 class="text-xl font-semibold mb-6">What We Offer</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-green-500 text-xl mt-0.5 shrink-0"
                />
                <span class="text-gray-600 dark:text-gray-300"
                  >Unlimited URL shortening with no account required</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-green-500 text-xl mt-0.5 shrink-0"
                />
                <span class="text-gray-600 dark:text-gray-300"
                  >Real-time click tracking and analytics dashboard</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-green-500 text-xl mt-0.5 shrink-0"
                />
                <span class="text-gray-600 dark:text-gray-300"
                  >Custom branded short links for your business</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-green-500 text-xl mt-0.5 shrink-0"
                />
                <span class="text-gray-600 dark:text-gray-300"
                  >HTTPS encryption for all shortened links</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-green-500 text-xl mt-0.5 shrink-0"
                />
                <span class="text-gray-600 dark:text-gray-300"
                  >Developer-friendly API for integrations</span
                >
              </li>
              <li class="flex items-start gap-3">
                <UIcon
                  name="i-heroicons-check-circle-20-solid"
                  class="text-green-500 text-xl mt-0.5 shrink-0"
                />
                <span class="text-gray-600 dark:text-gray-300"
                  >Link management dashboard with QR codes</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UContainer>
  </section>

  <!-- ==================== FAQ SECTION ==================== -->
  <section class="py-20 px-4">
    <UContainer>
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked <span class="text-primary">Questions</span>
        </h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Got questions? We've got answers. Here are the most common things
          people ask us about UrlShortener.
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <UAccordion :items="faqItems" />
      </div>
    </UContainer>
  </section>

  <!-- ==================== CTA SECTION ==================== -->
  <section class="py-20 px-4 bg-primary/5">
    <UContainer>
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Ready to <span class="text-primary">Shorten</span> Your URLs?
        </h2>
        <p
          class="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed"
        >
          Join millions of users who trust UrlShortener for fast, free, and
          reliable link shortening. No sign-up required — just paste and go!
        </p>
        <UButton
          size="xl"
          color="primary"
          variant="solid"
          label="Start Shortening Now"
          icon="i-heroicons-arrow-up-20-solid"
          class="font-semibold px-8 py-3"
          @click="scrollToTop"
        />
      </div>
    </UContainer>
  </section>

  <!-- ==================== FOOTER ==================== -->
  <footer class="py-16 px-4 bg-gray-900 dark:bg-gray-950 text-white">
    <UContainer>
      <div
        class="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto mb-12"
      >
        <!-- Brand -->
        <div class="md:col-span-1">
          <h3 class="text-2xl font-bold mb-4 font-['Poppins']">
            UrlShortener
          </h3>
          <p class="text-gray-400 leading-relaxed">
            The fastest and most reliable free URL shortening service on the
            web. Shorten, share, and track your links with ease.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                Home
              </NuxtLink>
            </li>
            <li>
              <a href="#features" class="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" class="text-gray-400 hover:text-white transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#about" class="text-gray-400 hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#faq" class="text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Resources</h4>
          <ul class="space-y-3">
            <li>
              <span class="text-gray-400">URL Shortening Guide</span>
            </li>
            <li>
              <span class="text-gray-400">Link Management Tips</span>
            </li>
            <li>
              <span class="text-gray-400">Marketing with Short URLs</span>
            </li>
            <li>
              <span class="text-gray-400">API Documentation</span>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Legal</h4>
          <ul class="space-y-3">
            <li>
              <span class="text-gray-400">Privacy Policy</span>
            </li>
            <li>
              <span class="text-gray-400">Terms of Service</span>
            </li>
            <li>
              <span class="text-gray-400">Cookie Policy</span>
            </li>
            <li>
              <span class="text-gray-400">DMCA Policy</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 pt-8 max-w-6xl mx-auto">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-gray-500 text-sm">
            &copy; {{ new Date().getFullYear() }} UrlShortener. All rights
            reserved.
          </p>
          <p class="text-gray-500 text-sm">
            Made with
            <UIcon
              name="i-heroicons-heart-solid"
              class="text-red-500 inline"
            />
            for a better web
          </p>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script lang="ts" setup>
import copyTextToClipboard from "copy-text-to-clipboard";
import { CreateShortUrl } from "~/utils/actions/url/UrlActions";

const url_value = ref("");
const no_value = ref(false);

watch(no_value, () => {
  if (no_value.value) {
    const interval = setInterval(() => {
      no_value.value = false;
      clearInterval(interval);
    }, 3000);
  }
});

const data = ref("");
const shortUrl = ref("");
const copied = ref(false);

watch(copied, () => {
  if (copied.value) {
    const interval = setInterval(() => {
      copied.value = false;
      clearInterval(interval);
    }, 3000);
  }
});

const config = useRuntimeConfig();
watch(data, () => {
  if (data.value) {
    const pr_url = config.public.baseUrl;
    shortUrl.value = pr_url + data.value;
  }
});

const loading = ref(false);

const createUrl = async () => {
  loading.value = true;
  if (url_value.value) {
    // console.log(url_value.value);
    const res = await CreateShortUrl(url_value.value);
    // console.log(res);
    if (res) {
      loading.value = false;
      data.value = res;
    }
  } else {
    loading.value = false;
    // console.log("no value");
    no_value.value = true;
  }
};

// FAQ items for accordion
const faqItems = [
  {
    label: "Is UrlShortener really free?",
    content:
      "Yes, absolutely! UrlShortener is 100% free to use with no hidden fees, no premium plans, and no restrictions. You can shorten as many URLs as you want without ever paying a cent.",
  },
  {
    label: "Do I need to create an account?",
    content:
      "No account is needed to shorten URLs. Simply paste your link and click shorten. However, creating a free account gives you access to click analytics, link management, and custom short links.",
  },
  {
    label: "How long do shortened URLs last?",
    content:
      "Shortened URLs created with UrlShortener never expire. Once created, your short link will continue to redirect to the original URL indefinitely.",
  },
  {
    label: "Can I customize my short URL?",
    content:
      "Yes! With a free account, you can create custom aliases for your short URLs. Instead of a random string, you can choose a meaningful slug that represents your content or brand.",
  },
  {
    label: "Is it safe to click on shortened URLs?",
    content:
      "We take security very seriously. All links are scanned for malicious content, and we use HTTPS encryption across our entire platform. We also provide link preview functionality so you can see the destination before clicking.",
  },
  {
    label: "Can I track how many clicks my link gets?",
    content:
      "Yes! Every shortened URL comes with built-in analytics. You can see total clicks, referral sources, geographic data, and more from your dashboard.",
  },
  {
    label: "What types of URLs can I shorten?",
    content:
      "You can shorten any valid URL from any website. This includes web pages, blog posts, social media profiles, YouTube videos, product pages, documents, and much more.",
  },
  {
    label: "Do you have an API for developers?",
    content:
      "Yes, we offer a RESTful API that allows developers to integrate URL shortening into their applications, bots, and workflows. Check out our API documentation for more details.",
  },
];

// Scroll to top function for CTA
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style></style>
