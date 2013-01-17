In this post, I talk about the results of my didgomezscore.com rewrite from PHP to node.js and reveal the differences in performance. But first… a little preface:

## A Brief Introduction

Last January, I wrote a simple website called [Did Scott Gomez Score Last Game?](http://didgomezscore.com) It was inspired by a now-defunct website called “Did The Cavs Win Last Night?,” created in the midst of a huge Cavaliers’ losing streak following the departure of Lebron James. Essentially, it was a web page that said “No.” on it.

I posted the website to Facebook during lunch time on January 23. That day, I ended up with 1,125 visitors. Considering the fact that none of my other websites have ever even totalled 1,125 visitors… I was pretty thrilled. Looking at Google’s real-time analytics, I could see a pattern where I’d receive short bursts of traffic whenever somebody shared my page on their Facebook wall. As a result, their friends would see the page and they would share it on their wall, etc. By the time Tuesday came along, that pattern was rolling full steam and I garnered 32,123 visitors that day, with about 20k of those coming from Facebook referrals alone!

The next day, just as I thought things couldn’t get any better, TSN Radio mentioned the site on their show and the host told James Duthie to plug it on national TV… he didn’t… However, just being mentioned on TSN Radio gave me a new record high of visitors: 62,151. This number would not be beat until Gomez finally scored, which netted me about 100k visitors in the 24-hours following his goal.

## Why Rewrite?

As the hype and traffic dwindled down, I realize that this was the perfect site for me to experiment with. My goal was to learn more about node.js and redis by rewriting this fairly simple website in node.js with express.js as my web server and redis to store my cached tweets and configuration values.

## The PHP Site

The original site was [written in PHP](https://github.com/achan/didgomezscore-php).

Here are its specs:

- Web Server: Apache 2.2.22
- PHP: PHP 5.2.17
- Operating System: Linux version 2.6.32 x86_64
- Hosting: Standard shared hosting by [Hostmonster](http://www.hostmonster.com/track/amoschan). (Affiliate link)

First, let me say that I was incredibly pleased by Hostmonster. I used the standard shared hosting plan, which is currently [$4.95/month](http://www.hostmonster.com/track/amoschan). It’s your typical “unlimited-everything” LAMP (Linux, Apache, MySQL, PHP) stack. Unlimited subdomains, parked domains, add-on domains, email addresses, etc. What I was really pleased with was that when [didgomezscore.com](http://didgomezscore.com) was at it’s peak, receiving 50-60k visitors a day, Hostmonster kept the site up and responsive. For anyone looking for an affordable way to host their PHP sites, I definitely recommend Hostmonster.

## The Node.js Site

The new site has now been [rewritten in javascript](https://github.com/achan/didgomezscore) with [Express.js](http://expressjs.com) as the web server and [Jade](http://jade-lang.com) as the HTML templating engine.

- Web Server: Nginx 1.0.5 proxying :80 to Express listening on :3000
- Node: Node 0.8.7
- Operating System: Ubuntu 11.10
- Hosting: [Linode 512](http://www.linode.com/?r=125ee158ade7f76e1ebe04c2a9bccabb9eff0233) (Referral link — Sign up with this link and I get a free month of Linode Hosting!)

I’ve also moved the rewritten code to a new VPS from [Linode](http://www.linode.com/?r=125ee158ade7f76e1ebe04c2a9bccabb9eff0233). I’ve been looking for a VPS to tinker with for a while and I ended up choosing Linode after reading all the [raving reviews on Reddit](http://www.reddit.com/r/programming/comments/8hhzs/vps_comparison_between_slicehost_and_prgmr_is_a_8). It’s been everything I expected and I have no regrets!

## Handling 1000 Requests: PHP vs. Node.js vs. Google

    time curl -s "http://didgomezscore.com?[1-1000]"
    real 4m4.308s
    user 0m0.349s
    sys 0m1.072s

    #not the real URL
    time curl -s "http://beta.didgomezscore.com?[1-1000]"
    real 0m41.092s
    user 0m0.216s
    sys 0m0.575s

    time curl -s "http://google.com?[1-1000]"
    real 0m53.385s
    user 0m0.226s
    sys 0m0.418s

Now, I know that there are many factors that go into these results… but still, the results were pretty eye-opening. Even though both versions look identical to the visitor, the PHP version took 4 minutes and 4 seconds to process 1000 requests whereas the Node.js version took only 41 seconds!

Yes, I’m sure a large part of it has to do with my lousy PHP code, the change of hardware as well as software… so take the results with a grain of salt!
