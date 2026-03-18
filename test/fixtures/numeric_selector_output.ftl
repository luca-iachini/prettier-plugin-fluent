accident-date = { $daysAgo ->
  [0] today
  [1] yesterday
  *[other] { $daysAgo } days ago
 }
