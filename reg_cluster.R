library(ggplot2)
library(dplyr)
library(tidyr)
library(readr)

args <- commandArgs(trailingOnly = TRUE)

hostName <- NULL
device <- NULL
n_bound <- 70
t_bound <- 30
u_bound <- 10
b_bound <- 10

# Parse arguments
for (i in 1:(length(args) - 1)) {
  if (args[i] == "-h") {
    hostName <- args[i + 1]
  } else if (args[i] == "-d") {
    device <- args[i + 1]
  } else if (args[i] == "-t") {
    t_bound <- as.integer(args[i + 1])
  } else if (args[i] == "-n") {
    n_bound <- as.integer(args[i + 1])
  } else if (args[i] == "-u") {
    u_bound <- as.integer(args[i + 1])
  } else if (args[i] == "-b") {
    b_bound <- as.integer(args[i + 1])
  } 
}

df = read_csv("BatteryTableAllLogs.csv")

clustered_df <- df %>%
  arrange(hostName, device, timestamp) %>%
  group_by(hostName, device) %>%
  mutate(time_diff = difftime(timestamp, lag(timestamp, default = first(timestamp)), units = "mins"),
         jump_cluster = cumsum(capacity - lag(capacity, default = first(capacity)) >= u_bound |
                                 capacity - lag(capacity, default = first(capacity)) <= -b_bound |
                                 time_diff > t_bound | 
                                 is.na(time_diff) |
                                 (capacity == 0 & lag(capacity, default = first(capacity)) != 0))) %>%
  group_by(hostName, device, jump_cluster) %>%
  filter(n() >= n_bound) %>%
  ungroup()

filtered_df = clustered_df %>%
  filter(hostName == !!hostName, device == !!device)

reg_plot <- ggplot(filtered_df, aes(x = timestamp, y = capacity, color = factor(jump_cluster))) +
  geom_point() +
  labs(x = "Timestamp", y = "Capacity", color = "Cluster") +
  ggtitle("Capacity vs. Timestamp with Clustering") +
  theme_minimal()

if (!file.exists("discharge_cycle_plots")) {
  dir.create("discharge_cycle_plots")
}

file_path <- "discharge_cycle_plots/reg_cluster.png"

png(file = file_path, width = 800, height = 600)
reg_plot
dev.off()
