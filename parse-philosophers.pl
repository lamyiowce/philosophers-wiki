#!/usr/bin/perl
use warnings;
use strict;

my $input;
my $filename = "philosophers-list.xml";
my $encoding = ":encoding(UTF-8)";
my @line;
open ($input, "< $encoding", $filename) or die "Nie mozna otworzyc pliku.";


my $output;
my $outname = "phil.list";
open ($output, "> $encoding", $outname) or die "Nie mozna utworzyc pliku";


my $temp;
while (<$input>) {
	if (/\* \[\[([\w\s]+)\]\]/) {
		$temp = $1;
		$temp =~ s/\s/\_/;
		print $output "$temp\n";
	}
}


